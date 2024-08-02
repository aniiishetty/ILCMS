import { Request, Response } from 'express';
import { DailyLog } from '../models/dailyLog';

// Create a new daily log
export const createDailyLog = async (req: Request, res: Response) => {
  try {
    const dailyLog = await DailyLog.create(req.body);
    res.status(201).json(dailyLog);
  } catch (error) {
    console.error('Error creating daily log:', error);
    res.status(500).json({ error: 'Failed to create daily log' });
  }
};

// Get all daily logs
export const getAllDailyLogs = async (req: Request, res: Response) => {
  try {
    const dailyLogs = await DailyLog.findAll();
    res.status(200).json(dailyLogs);
  } catch (error) {
    console.error('Error fetching daily logs:', error);
    res.status(500).json({ error: 'Failed to fetch daily logs' });
  }
};

// Get a single daily log by ID
export const getDailyLogById = async (req: Request, res: Response) => {
  try {
    const dailyLog = await DailyLog.findByPk(req.params.id);
    if (dailyLog) {
      res.status(200).json(dailyLog);
    } else {
      res.status(404).json({ error: 'Daily log not found' });
    }
  } catch (error) {
    console.error('Error fetching daily log:', error);
    res.status(500).json({ error: 'Failed to fetch daily log' });
  }
};

// Update a daily log by ID
export const updateDailyLog = async (req: Request, res: Response) => {
  try {
    const [updated] = await DailyLog.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedDailyLog = await DailyLog.findByPk(req.params.id);
      res.status(200).json(updatedDailyLog);
    } else {
      res.status(404).json({ error: 'Daily log not found' });
    }
  } catch (error) {
    console.error('Error updating daily log:', error);
    res.status(500).json({ error: 'Failed to update daily log' });
  }
};

// Delete a daily log by ID
export const deleteDailyLog = async (req: Request, res: Response) => {
  try {
    const deleted = await DailyLog.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Daily log deleted successfully' });
    } else {
      res.status(404).json({ error: 'Daily log not found' });
    }
  } catch (error) {
    console.error('Error deleting daily log:', error);
    res.status(500).json({ error: 'Failed to delete daily log' });
  }
};
