// routes/preScreeningRoutes.ts
import { Router } from 'express';
import { createPreScreening, getPreScreening } from '../controllers/PreScreeningController';

import multer from 'multer'

const router = Router();
const upload = multer({  })

router.post('/create', createPreScreening);
router.get('/all', getPreScreening);

export default router;
