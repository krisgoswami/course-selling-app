import express from 'express';
import { authenticateJwt } from "../utils/jwtAuth.js";
import { createUser, userLogin, getCourses, purchaseCourse } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/courses', authenticateJwt, getCourses);
router.post('/purchaseCourse/:id', authenticateJwt, purchaseCourse);
// router.put('/updateCourse/:id', authenticateJwt, updateCourse);
// router.delete('/deleteCourse/:id', authenticateJwt, deleteCourse);


export default router;