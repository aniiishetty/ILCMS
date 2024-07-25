import express from 'express';
import { uploadPhoto, getPhotoByUserId, deletePhotoByUserId } from '../controllers/studentPhotoController';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('photo'), uploadPhoto);
router.get('/:userId', getPhotoByUserId);
router.delete('/:userId', deletePhotoByUserId);

export default router;
