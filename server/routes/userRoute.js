import express from 'express';
import { authenticateJwt } from "../utils/jwtAuth.js";
import { createUser, userLogin } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
// router.post('/createCourse', authenticateJwt, createCourse);
// router.get('/courses', authenticateJwt, getCourses);
// router.put('/updateCourse/:id', authenticateJwt, updateCourse);
// router.delete('/deleteCourse/:id', authenticateJwt, deleteCourse);


export default router;