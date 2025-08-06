require("dotenv").config();

const { consumeCourseEnroll } = require("./utils/notificationConsumer");
consumeCourseEnroll();