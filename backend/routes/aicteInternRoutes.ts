import express from 'express';
import multer from 'multer';
import { createAicteIntern } from '../controllers/aicteInternController';

const router = express.Router();
const upload = multer();
router.post('/aicte-interns', upload.single('resume'), createAicteIntern);

export default router;
