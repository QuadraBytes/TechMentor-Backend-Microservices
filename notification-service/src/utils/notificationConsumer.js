const amqp = require("amqplib");
const AWS = require('aws-sdk');

// Use env vars or hardcoded temporarily (for testing)
AWS.config.update({
    region: 'us-east-1', // Change to your SES region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace if not using env vars
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const consumeCourseEnroll = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);

        const channel = await connection.createChannel();
        await channel.assertQueue("course_enroll");

        console.log("Listening for course_enroll events...");
        // await sendEmail(
        //     'ashanisuru741@gmail.com',
        //     `New Enrollment for 2201`,
        //     `Student Kasun has enrolled in your course "2201".`
        // );

        channel.consume("course_enroll", async (msg) => {
            if (msg !== null) {
                const details = JSON.parse(msg.content.toString());
                console.log("Received course_enroll event:", details);

                // You can handle logic here (e.g., log it, save it, notify users)
                const { studentId, studentName, instructorEmail, courseTitle } = details;

                await sendEmail(
                    instructorEmail,
                    `New Enrollment for ${courseTitle}`,
                    `Student ${studentName} with registration ID ${studentId} has enrolled in your course "${courseTitle}".`
                );

                channel.ack(msg);
            }
        });
    } catch (err) {
        console.error("RabbitMQ consumer failed:", err);
    }
};

const sendEmail = async (toEmail, subject, bodyText) => {
    const params = {
        Source: "oshanimesh2000@gmail.com", // root user email
        Destination: {
            ToAddresses: [toEmail]
        },
        Message: {
            Subject: {
                Data: subject
            },
            Body: {
                Text: {
                    Data: bodyText + "\n\nThank you for using our service!" + "\n\nBest regards,\nTechMentor Team"
                }
            }
        }
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log("Email sent:", result.MessageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};


module.exports = { consumeCourseEnroll };
