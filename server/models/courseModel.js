import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     price: Number,
//     imageLink: String,
//     published: Boolean,
// });

const adminSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    imageLink: {
        type: String,
        required: [true, "imageLink is required"],
    },
    published: {
        type: Boolean,
        required: [true, "published is required"],
    },
})

export const Course = mongoose.model("Course", adminSchema);