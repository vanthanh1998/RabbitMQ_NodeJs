const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://djjweljk:XFeNp08HiV6JjMW_5Yeupd8zSNbA3pud@armadillo.rmq.cloudamqp.com/djjweljk";

const sendEmail = async () => {
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

    const agrs = process.argv.slice(2);
    const msg = agrs[1] || "Fixed!";
    const topic = agrs[0];
    console.log(`>>> msg: ${msg}, topic: ${topic}`);
    // 4. publish email
    await channel.publish(nameExchange, topic, Buffer.from(msg));

    console.log(`>>> Send ok: ${msg}`);

    setTimeout(function () {
      conn.close;
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log(">>> error:", error.message);
  }
};

sendEmail();
