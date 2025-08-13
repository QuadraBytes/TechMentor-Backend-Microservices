const CourseModel = require("../models/course.model");
const { publishCourseEnroll } = require("../utils/courseProducer");

const addCourse = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);

        const course = await CourseModel.findOne({
            name: data.title,
        });

        if (course) {
            console.log("Course already added");
            return res.status(401).json({
                status: "error",
                message: "Course already added",
            });
        }

        const newCourse = new CourseModel({
            title: data.title,
            description: data.description,
            instructor_id: data.instructor_id,
            instructor_name: data.instructor_name,
            content: data.content,
            instructor_email: data.instructor_email
        });

        const result = await newCourse.save();

        console.log("Course added successfully");
        console.log(newCourse);

        if (result) {
            return res.status(201).json({
                status: "success",
                message: "Course added successfully",
                courseId: result._id,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error occured",
        });
    }
};

const editCourse = async (req, res, next) => {
    try {
        const data = req.body;
        const courseId = req.params.id;

        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.log("Course not found");
            return res.status(404).json({
                status: "error",
                message: "Course not found",
            });
        }

        course.title = data.title || course.title;
        course.description = data.description || course.description;
        course.content = data.content || course.content;

        const updatedCourse = await course.save();

        console.log("Course updated successfully");
        return res.status(200).json({
            status: "success",
            message: "Course updated successfully",
            updatedCourse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error occured",
        });
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;

        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.log("Course not found");
            return res.status(404).json({
                status: "error",
                message: "Course not found",
            });
        }
        if (course._isDeleted) {
            console.log("Course already deleted");
            return res.status(400).json({
                status: "error",
                message: "Course already deleted",
            });
        }

        course._isDeleted = true;
        await course.save();

        console.log("Course deleted successfully");
        return res.status(200).json({
            status: "success",
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error occured",
        });
    }
};

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await CourseModel.find({ _isDeleted: { $ne: true } });

        const allCourses = courses.map((course) => ({
            id: course._id,
            title: course.title,
            description: course.description,
            content: course.content,
            instructor_id: course.instructor_id,
            instructor_name: course.instructor_name,
            instructor_email: course.instructor_email,
        }));

        if (allCourses.length == 0) {
            console.log("Courses not found");
            return res.status(404).json({
                status: "error",
                message: "Courses not found",
            });
        }

        return res.status(200).json({
            status: "success",
            courses: allCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error occured",
        });
    }
};

const getOneCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;

        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.log("Course not found");
            return res.status(404).json({
                status: "error",
                message: "Course not found",
            });
        }
        if (course._isDeleted) {
            console.log("Course is deleted");
            return res.status(400).json({
                status: "error",
                message: "Course is deleted",
            });
        }
        const courseDetail = {
            id: course._id,
            title: course.title,
            description: course.description,
            instructor_id: course.instructor_id,
            instructor_name: course.instructor_name,
            content: course.content,
            isActive: course._isActive,
            instructor_email: course.instructor_email,
        };
        console.log("Course found successfully");
        return res.status(200).json({
            status: "success",
            course: courseDetail,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error occured",
        });
    }
};

const enrollInCourse = async (req, res, next) => {
    console.log("Enrolling in course");
    try {
        const courseId = req.params.id;
        const userId = req.body.id;
        const username = req.body.username;

        console.log(userId);

        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.log("Course not found");
            return res.status(404).json({
                status: "error",
                message: "Course not found",
            });
        }
        if (course._isDeleted) {
            console.log("Course is deleted");
            return res.status(400).json({
                status: "error",
                message: "Course is deleted",
            });
        }

        if (course.students.includes(userId)) {
            console.log("Already enrolled in course");
            return res.status(400).json({
                status: "error",
                message: "Already enrolled in course",
            });
        }

        course.students.push({ studentId: userId, studentName: username });
        await course.save();

        await publishCourseEnroll({
            studentId: userId,
            studentName: username,
            instructorEmail: course.instructor_email,
            courseTitle: course.title
        });

        console.log("Enrolled in course successfully");

        return res.status(200).json({
            status: "success",
            message: `Successfully enrolled`,
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
    addCourse,
    editCourse,
    deleteCourse,
    getAllCourses,
    getOneCourse,
    enrollInCourse,
};