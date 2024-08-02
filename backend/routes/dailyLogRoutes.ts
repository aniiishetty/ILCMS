import { Router } from 'express';
import {
  createDailyLog,
  getAllDailyLogs,
  getDailyLogById,
  updateDailyLog,
  deleteDailyLog
} from '../controllers/dailyLogController';

const router = Router();

// Route to create a new daily log
router.post('/', createDailyLog);

// Route to get all daily logs
router.get('/', getAllDailyLogs);

// Route to get a daily log by ID
router.get('/:id', getDailyLogById);

// Route to update a daily log by ID
router.put('/:id', updateDailyLog);

// Route to delete a daily log by ID
router.delete('/:id', deleteDailyLog);

export default router;
