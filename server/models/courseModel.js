import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
});

const Course = mongoose.model("Course", adminSchema);

module.exports = Course;