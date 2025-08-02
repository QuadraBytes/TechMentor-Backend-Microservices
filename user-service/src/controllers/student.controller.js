const CourseModel = require("../models/course.model");

const getEnrolledCourses = async (req, res, next) => {
    try {
        const id = req.params.id;

        const courses = await CourseModel.find({
            students: id,
        }).populate("instructor_id", "fullname");

        const enrolledCourses = courses.filter((course) => course !== null);

        res.status(200).json({
            status: "success",
            message: "Enrolled courses found successfully",
            enrolledCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error occurred",
        });
    }
};

module.exports = {
    getEnrolledCourses,
};