const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://djjweljk:XFeNp08HiV6JjMW_5Yeupd8zSNbA3pud@armadillo.rmq.cloudamqp.com/djjweljk";
const amqp_url_docker = "amqp://localhost";

const receiveQueue = async () => {
  try {
    // 1. Create connect
    const conn = await amqplib.connect(amqp_url_docker);
    // 2. Create channel
    const channel = await conn.createChannel();
    // 3. Create name queue
    const nameQueue = "queue2";
    // 4. Create queue
    await channel.assertQueue(nameQueue, {
      durable: true,
    });
    // 5. receive to queue
    await channel.consume(
      nameQueue,
      (msg) => {
        console.log(">>> message", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
    // 6. close conn and channel
  } catch (error) {
    console.log(">>> eror:", error.message);
  }
};

receiveQueue();
