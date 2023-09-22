import express from 'express';
import { createAdmin } from '../controllers/adminController.js'

const router = express.Router();

router.post('/signup', createAdmin);

export default router;