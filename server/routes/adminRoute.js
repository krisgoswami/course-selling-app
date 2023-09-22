import express from 'express';

const router = express.Router();

router.post('/signup', createAdmin);
router.post('/', createUser);