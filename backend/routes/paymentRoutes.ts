import { Router } from 'express';
import { createPayment, getAllPayments } from '../controllers/paymentController';

import multer from 'multer';

const router = Router();
const upload = multer({  });

router.post('/submit', createPayment);
router.get('/all', getAllPayments);

export default router;
