import { Request, Response } from 'express';
import { DailyLog } from '../models/dailyLog'; // Adjust the import according to your model file location

// Get all daily logs
export const getDailyLogs = async (req: Request, res: Response) => {
  try {
    const dailyLogs = await DailyLog.findAll(); // Use findAll instead of find
    res.status(200).json({ success: true, dailyLogs });
  } catch (error) {
    console.error('Error fetching daily logs:', error);
    res.status(500).json({ success: false, message: 'Error fetching daily logs' });
  }
};

// Get daily logs by user ID
export const getDailyLogsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const dailyLogs = await DailyLog.findAll({
      where: { userId } // Use where clause for filtering
    });
    res.status(200).json({ success: true, dailyLogs });
  } catch (error) {
    console.error('Error fetching daily logs for user:', error);
    res.status(500).json({ success: false, message: 'Error fetching daily logs for user' });
  }
};

// Create a new daily log
export const createDailyLog = async (req: Request, res: Response) => {
  const { day, date, arrivalTime, departureTime, remarks, department, finishedProduct, hodName, hodEmail, mainPoints, userId } = req.body;
  try {
    const dailyLog = await DailyLog.create({
      day,
      date,
      arrivalTime,
      departureTime,
      remarks,
      department,
      finishedProduct,
      hodName,
      hodEmail,
      mainPoints,
      userId, // Directly use userId here
    });
    res.status(201).json({ success: true, message: 'Daily log created successfully' });
  } catch (error) {
    console.error('Error creating daily log:', error);
    res.status(500).json({ success: false, message: 'Error creating daily log' });
  }
};

// Update a daily log
export const updateDailyLog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { day, date, arrivalTime, departureTime, remarks, department, finishedProduct, hodName, hodEmail, mainPoints } = req.body;
  try {
    const [updated] = await DailyLog.update({
      day,
      date,
      arrivalTime,
      departureTime,
      remarks,
      department,
      finishedProduct,
      hodName,
      hodEmail,
      mainPoints,
    }, {
      where: { id }, // Use where clause to identify which log to update
    });

    if (updated) {
      const updatedLog = await DailyLog.findByPk(id); // Fetch the updated log
      res.status(200).json({ success: true, updatedLog });
    } else {
      res.status(404).json({ success: false, message: 'Daily log not found' });
    }
  } catch (error) {
    console.error('Error updating daily log:', error);
    res.status(500).json({ success: false, message: 'Error updating daily log' });
  }
};

// Delete a daily log
export const deleteDailyLog = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleted = await DailyLog.destroy({
      where: { id }, // Use where clause to identify which log to delete
    });

    if (deleted) {
      res.status(200).json({ success: true, message: 'Daily log deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Daily log not found' });
    }
  } catch (error) {
    console.error('Error deleting daily log:', error);
    res.status(500).json({ success: false, message: 'Error deleting daily log' });
  }
};
