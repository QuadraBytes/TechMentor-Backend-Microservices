const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue("course_enroll");
        console.log("RabbitMQ connected in course-service");
    } catch (err) {
        console.error("Failed to connect to RabbitMQ", err);
    }
};

const publishCourseEnroll = async (studentData) => {
    if (!channel) return;
    channel.sendToQueue("course_enroll", Buffer.from(JSON.stringify(studentData)));
    console.log("Sent course_enroll event to queue");
};

module.exports = { connectRabbitMQ, publishCourseEnroll };
