import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ]
})

export const User = mongoose.model("User", userSchema);