import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "coursesapp",
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

module.exports = connectDB;