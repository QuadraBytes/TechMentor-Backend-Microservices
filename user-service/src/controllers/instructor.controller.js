
const CourseModel = require("../models/course.model");

const getInstructorCourses = async (req, res, next) => {
    try {
        const instructorId = req.params.id;

        const courses = await CourseModel.find({
            instructor_id: instructorId,
            _isDeleted: false,
        });

        const courseData = courses.map((course) => ({
            id: course._id,
            title: course.title,
            description: course.description,
            content: course.content,
            instructor_id: course.instructor_id,
            instructor_name: course.instructor_name,
            students: course.students,
        }));
    
        res.status(200).json({
            status: "success",
            message: "Instructor courses found successfully",
            courses: courseData,
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
    getInstructorCourses,
};
