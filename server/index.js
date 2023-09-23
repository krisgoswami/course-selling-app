import express from 'express';
import cors from 'cors';
import connectDB from './dbconfig/connectdb.js';
import adminRoute from './routes/adminRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();

//connect database
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/user', userRoute);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
}); 