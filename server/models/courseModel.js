import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
});

export const Course = mongoose.model("Course", adminSchema);