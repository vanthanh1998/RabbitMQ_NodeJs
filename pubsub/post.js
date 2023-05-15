const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://djjweljk:XFeNp08HiV6JjMW_5Yeupd8zSNbA3pud@armadillo.rmq.cloudamqp.com/djjweljk";

const postVideo = async ({ msg }) => {
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

    // 4. publish video
    await channel.publish(nameExchange, "", Buffer.from(msg));

    console.log(`>>> Send ok: ${msg}`);

    setTimeout(function () {
      conn.close;
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log(">>> error:", error.message);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello Exchange";
postVideo({ msg });
