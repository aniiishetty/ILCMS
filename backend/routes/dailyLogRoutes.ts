import express from 'express';
import { getDailyLogs, getDailyLogsByUserId, createDailyLog, updateDailyLog, deleteDailyLog } from '../controllers/dailyLogController';

const router = express.Router();

router.get('/all', getDailyLogs); // Ensure correct method name
router.get('/user/:userId', getDailyLogsByUserId); // Ensure correct method name
router.post('/user', createDailyLog);
router.put('/:id', updateDailyLog);
router.delete('/:id', deleteDailyLog);

export default router;
