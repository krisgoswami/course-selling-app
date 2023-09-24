import { Course } from "../models/courseModel.js";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';

// *********user registration*********

export const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            });
        };

        //check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists",
                success: false,
            });
        };

        //save user to database
        const user = new User({
            email: email,
            password: password,
        });
        await user.save();

        //create token upon sign up
        const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: '1h' });
        return res.status(200).send({
            message: "User registered successfully",
            success: true,
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error registering user',
            success: false,
            error,
        });
    }
}

// *********user login*********

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            });
        };

        //validation to check if credentials are correct
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(500).send({
                message: "Email or password incorrect",
                success: false,
            });
        }
        const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: "1h" });
        res.status(200).send({
            message: "successfully logged in",
            success: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error logging in',
            success: false,
            error,
        });
    }
}

// *********display all courses for user*********

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.findOne({ published: true });
        if (!courses) {
            return res.status(400).send({
                message: "No courses found",
                success: false,
            });
        }
        res.status(200).send({
            success: true,
            courses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Something went wrong',
            success: false,
            error,
        });
    }
}

// *********purchase course*********

export const purchaseCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (course) {
            const user = await User.findOne({ email: req.user.email });
            // console.log(user);
            // console.log(course);

            if (user) {
                user.purchasedCourses.push(course);
                await user.save();
                res.status(200).send({
                    message: "Course purchased successfully",
                    success: true,
                    user,
                });
            } else {
                return res.status(403).send({
                    message: "User not found",
                    success: false,
                });
            }

        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Course not found',
            success: false,
            error,
        });
    }
}

// *********display purchased courses*********

export const purchasedCourses = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).populate('purchasedCourses');

        if (user) {
            res.status(200).send({
                purchasedCourses: user.purchasedCourses || [],
                success: true,
            });
        } else {
            return res.status(400).send({
                message: "User not found",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No courses found',
            success: false,
            error,
        });
    }
}