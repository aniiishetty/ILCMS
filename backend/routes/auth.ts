// backend/routes/auth.ts
import { Router } from 'express';
import { login, createCredentials } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/create', createCredentials);

export default router;
