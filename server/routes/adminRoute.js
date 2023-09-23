import express from 'express';
import { authenticateJwt } from "../utils/jwtAuth.js";
import { createAdmin, adminLogin, createCourse, updateCourse } from '../controllers/adminController.js'

const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);
router.post('/createCourse', authenticateJwt, createCourse);
router.put('/updateCourse/:id', authenticateJwt, updateCourse);


export default router;