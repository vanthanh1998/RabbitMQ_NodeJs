const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://djjweljk:XFeNp08HiV6JjMW_5Yeupd8zSNbA3pud@armadillo.rmq.cloudamqp.com/djjweljk";

const receiveNotice = async () => {
  try {
    // 1. Create connect
    const conn = await amqplib.connect(amqp_url_cloud);
    // 2. Create channel
    const channel = await conn.createChannel();

    // 3. create exchange
    const nameExchange = "video";

    // 'direct' | 'topic' | 'headers' | 'fanout' | 'match'
    await channel.assertExchange(nameExchange, "fanout", {
      durable: false,
    });

    // 4. create queue
    const {
      queue, // name queue
    } = await channel.assertQueue("", {
      exclusive: true,
    });

    console.log(`>>> name queue: ${queue}`);

    // 5. binding
    await channel.bindQueue(queue, nameExchange, "");

    await channel.consume(
      queue,
      (msg) => {
        console.log(">>> message", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log(">>> error:", error.message);
  }
};

receiveNotice();
