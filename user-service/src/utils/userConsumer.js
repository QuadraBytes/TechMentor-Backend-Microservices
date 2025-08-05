const amqp = require("amqplib");

const consumeCourseEnroll = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("course_enroll");

        console.log("Listening for course_enroll events...");

        channel.consume("course_enroll", async (msg) => {
            if (msg !== null) {
                const student = JSON.parse(msg.content.toString());
                console.log("Received course_enroll event:", student);

                // You can handle logic here (e.g., log it, save it, notify users)

                channel.ack(msg);
            }
        });
    } catch (err) {
        console.error("RabbitMQ consumer failed:", err);
    }
};

module.exports = { consumeCourseEnroll };
