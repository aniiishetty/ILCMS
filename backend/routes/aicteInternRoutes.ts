import express from 'express';
import multer from 'multer';
import { createAicteIntern } from '../controllers/aicteInternController';

const router = express.Router();

// Setup multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route to handle AICTE Intern form submission
router.post('/create', upload.single('resume'), createAicteIntern);

export default router;
