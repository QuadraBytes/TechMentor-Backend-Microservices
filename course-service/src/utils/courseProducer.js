const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue("course_created");
        console.log("RabbitMQ connected in course-service");
    } catch (err) {
        console.error("Failed to connect to RabbitMQ", err);
    }
};

const publishCourseCreated = async (courseData) => {
    if (!channel) return;
    channel.sendToQueue("course_created", Buffer.from(JSON.stringify(courseData)));
    console.log("Sent course_created event to queue");
};

module.exports = { connectRabbitMQ, publishCourseCreated };
