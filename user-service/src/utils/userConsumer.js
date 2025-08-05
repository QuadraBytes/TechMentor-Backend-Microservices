const amqp = require("amqplib");

const consumeCourseCreated = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("course_created");

        console.log("Listening for course_created events...");

        channel.consume("course_created", async (msg) => {
            if (msg !== null) {
                const course = JSON.parse(msg.content.toString());
                console.log("Received course_created event:", course.title);

                // You can handle logic here (e.g., log it, save it, notify users)

                channel.ack(msg);
            }
        });
    } catch (err) {
        console.error("RabbitMQ consumer failed:", err);
    }
};

module.exports = { consumeCourseCreated };
