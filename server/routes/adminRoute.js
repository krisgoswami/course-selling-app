import express from 'express';
import { authenticateJwt } from "../utils/jwtAuth.js";
import { createAdmin, adminLogin, createCourse, updateCourse, deleteCourse, getCourses } from '../controllers/adminController.js'

const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);
router.post('/createCourse', authenticateJwt, createCourse);
router.get('/courses', authenticateJwt, getCourses);
router.put('/updateCourse/:id', authenticateJwt, updateCourse);
router.delete('/deleteCourse/:id', authenticateJwt, deleteCourse);


export default router;