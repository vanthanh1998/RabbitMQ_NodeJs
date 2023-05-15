const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://djjweljk:XFeNp08HiV6JjMW_5Yeupd8zSNbA3pud@armadillo.rmq.cloudamqp.com/djjweljk";

const receiveEmail = async () => {
  try {
    // 1. Create connect
    const conn = await amqplib.connect(amqp_url_cloud);
    // 2. Create channel
    const channel = await conn.createChannel();

    // 3. create exchange
    const nameExchange = "send_mail";

    // 'direct' | 'topic' | 'headers' | 'fanout' | 'match'
    await channel.assertExchange(nameExchange, "topic", {
      durable: false,
    });

    // 4. create queue
    const { queue } = await channel.assertQueue("", {
      exclusive: true,
    });

    // 5. binding
    const agrs = process.argv.slice(2);
    if (!agrs.length) {
      process.exit(0);
    }

    /**
     * * có nghĩa là phù hợp với bất kỳ từ nào
     * # khớp với 1 or nhiều từ bất kỳ
     */

    console.log(`>>> waiting queue: ${queue}, topic: ${agrs}`);

    agrs.forEach(async (key) => {
      await channel.bindQueue(queue, nameExchange, key);
    });

    await channel.consume(queue, (msg) => {
      console.log(
        `>>> Routing key: ${
          msg.fields.routingKey
        }, topic: ${msg.content.toString()}`
      );
    });
  } catch (error) {
    console.log(">>> error:", error.message);
  }
};

receiveEmail();
