import express from 'express';
import { signup, login, logout, me } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.midleware.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me',protect, me)

export default router;