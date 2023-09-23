import { Admin } from "../models/adminModel.js";
import { Course } from "../models/courseModel.js";
import jwt from 'jsonwebtoken';
// import { authenticateJwt } from "../utils/jwtAuth.js";

// *********admin registration*********

export const createAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: 'fill all fields',
                success: false,
            });
        }

        //validation for existing admin
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({
                message: 'admin already exists',
                success: false
            })
        }

        //saving admin to the database
        const admin = new Admin({
            email: email,
            password: password,
        });
        await admin.save();
        const token = jwt.sign({ email, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' }); //created this token such that user can login upon signing up
        return res.status(200).send({
            message: 'Admin registered',
            success: true,
            admin,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error registering admin',
            success: false,
            error,
        });
    }
}

// *********admin login*********

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: 'fill all fields',
                success: false,
            });
        }

        //validation to check if credentials are correct
        const admin = await Admin.findOne({ email, password });
        if (!admin) {
            return res.status(400).send({
                message: "email or password incorrect",
                success: false,
            });
        }
        const token = jwt.sign({ email, role: "admin" }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).send({
            message: "Login successful",
            success: true,
            admin,
            token,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error logging in',
            success: false,
            error,
        });
    }
}

// *********admin create course*********

export const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({
            message: "Course created successfully",
            success: true,
            course,
            courseId: course.id,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error creating course',
            success: false,
            error,
        });
    }
}


// *********get all courses*********

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).send({ courses });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No courses found',
            success: false,
            error,
        });
    }
}

// *********admin update course*********

export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).send({
                message: "Course not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Course updated succefully",
            success: true,
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error updating course',
            success: false,
            error,
        });
    }
}

// *********admin delete course*********

export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findOneAndDelete(courseId);
        if (!course) {
            return res.status(404).send({
                message: "Course not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Course deleted",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error deleting course',
            success: false,
            error,
        });
    }
}