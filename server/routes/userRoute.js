import express from 'express';
import { authenticateJwt } from "../utils/jwtAuth.js";
import { createUser, userLogin, getCourses, purchaseCourse, purchasedCourses } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/courses', getCourses);
router.post('/purchaseCourse/:id', authenticateJwt, purchaseCourse);
router.get('/purchasedCourses', authenticateJwt, purchasedCourses);


export default router;