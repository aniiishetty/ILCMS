"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDailyLog = exports.updateDailyLog = exports.createDailyLog = exports.getDailyLogsByUserId = exports.getDailyLogs = void 0;
const dailyLog_1 = require("../models/dailyLog"); // Adjust the import according to your model file location
// Get all daily logs
const getDailyLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailyLogs = yield dailyLog_1.DailyLog.findAll(); // Use findAll instead of find
        res.status(200).json({ success: true, dailyLogs });
    }
    catch (error) {
        console.error('Error fetching daily logs:', error);
        res.status(500).json({ success: false, message: 'Error fetching daily logs' });
    }
});
exports.getDailyLogs = getDailyLogs;
// Get daily logs by user ID
const getDailyLogsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const dailyLogs = yield dailyLog_1.DailyLog.findAll({
            where: { userId } // Use where clause for filtering
        });
        res.status(200).json({ success: true, dailyLogs });
    }
    catch (error) {
        console.error('Error fetching daily logs for user:', error);
        res.status(500).json({ success: false, message: 'Error fetching daily logs for user' });
    }
});
exports.getDailyLogsByUserId = getDailyLogsByUserId;
// Create a new daily log
const createDailyLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { day, date, arrivalTime, departureTime, remarks, department, finishedProduct, hodName, hodEmail, mainPoints, userId } = req.body;
    try {
        const dailyLog = yield dailyLog_1.DailyLog.create({
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
    }
    catch (error) {
        console.error('Error creating daily log:', error);
        res.status(500).json({ success: false, message: 'Error creating daily log' });
    }
});
exports.createDailyLog = createDailyLog;
// Update a daily log
const updateDailyLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { day, date, arrivalTime, departureTime, remarks, department, finishedProduct, hodName, hodEmail, mainPoints } = req.body;
    try {
        const [updated] = yield dailyLog_1.DailyLog.update({
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
            const updatedLog = yield dailyLog_1.DailyLog.findByPk(id); // Fetch the updated log
            res.status(200).json({ success: true, updatedLog });
        }
        else {
            res.status(404).json({ success: false, message: 'Daily log not found' });
        }
    }
    catch (error) {
        console.error('Error updating daily log:', error);
        res.status(500).json({ success: false, message: 'Error updating daily log' });
    }
});
exports.updateDailyLog = updateDailyLog;
// Delete a daily log
const deleteDailyLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleted = yield dailyLog_1.DailyLog.destroy({
            where: { id }, // Use where clause to identify which log to delete
        });
        if (deleted) {
            res.status(200).json({ success: true, message: 'Daily log deleted successfully' });
        }
        else {
            res.status(404).json({ success: false, message: 'Daily log not found' });
        }
    }
    catch (error) {
        console.error('Error deleting daily log:', error);
        res.status(500).json({ success: false, message: 'Error deleting daily log' });
    }
});
exports.deleteDailyLog = deleteDailyLog;
