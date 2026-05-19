import express from 'express';
import { health,ai } from '../controllers/example.controller.js';

const router = express.Router();

router.get('/health', health);

router.post('/ai', ai);


export default router;
