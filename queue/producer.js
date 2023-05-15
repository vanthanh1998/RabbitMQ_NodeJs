const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://djjweljk:XFeNp08HiV6JjMW_5Yeupd8zSNbA3pud@armadillo.rmq.cloudamqp.com/djjweljk";
const amqp_url_docker = "amqp://localhost";

const sendQueue = async ({ msg }) => {
  try {
    // 1. Create connect
    const conn = await amqplib.connect(amqp_url_docker);
    // 2. Create channel
    const channel = await conn.createChannel();
    // 3. Create name queue
    const nameQueue = "queue2";
    // 4. Create queue
    await channel.assertQueue(nameQueue, {
      durable: true, // true => khi restart k bị mất data client đã send
    });
    // 5. Send to queue
    await channel.sendToQueue(nameQueue, Buffer.from(msg), {
      persistent: true,
    });
    // 6. close conn and channel
  } catch (error) {
    console.log(">>> eror:", error.message);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello";
// process.argv = [
//   bin.node
//   path
//   hello1
// ]

sendQueue({ msg });
