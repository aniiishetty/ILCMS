import express from 'express';
import multer from 'multer';
import { createAicteIntern, getAicteInternById } from '../controllers/aicteInternController';

const router = express.Router();

// Setup multer for handling file uploads
const upload = multer({ });

// Route to handle AICTE Intern form submission
router.post('/create', createAicteIntern);
router.get('/:id', getAicteInternById);

export default router;
