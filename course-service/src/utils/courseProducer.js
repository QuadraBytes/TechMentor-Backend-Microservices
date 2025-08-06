const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue("course_enroll");
        console.log("RabbitMQ connected in course-service");
    } catch (err) {
        console.error("Failed to connect to RabbitMQ", err);
    }
};

const publishCourseEnroll = async (courseDetail) => {
    if (!channel) return;
    channel.sendToQueue("course_enroll", Buffer.from(JSON.stringify(courseDetail)));
    console.log("Sent course_enroll event to queue");
};

module.exports = { connectRabbitMQ, publishCourseEnroll };
