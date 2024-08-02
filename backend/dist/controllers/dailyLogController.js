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
exports.deleteDailyLog = exports.updateDailyLog = exports.getDailyLogById = exports.getAllDailyLogs = exports.createDailyLog = void 0;
const dailyLog_1 = require("../models/dailyLog");
// Create a new daily log
const createDailyLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailyLog = yield dailyLog_1.DailyLog.create(req.body);
        res.status(201).json(dailyLog);
    }
    catch (error) {
        console.error('Error creating daily log:', error);
        res.status(500).json({ error: 'Failed to create daily log' });
    }
});
exports.createDailyLog = createDailyLog;
// Get all daily logs
const getAllDailyLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailyLogs = yield dailyLog_1.DailyLog.findAll();
        res.status(200).json(dailyLogs);
    }
    catch (error) {
        console.error('Error fetching daily logs:', error);
        res.status(500).json({ error: 'Failed to fetch daily logs' });
    }
});
exports.getAllDailyLogs = getAllDailyLogs;
// Get a single daily log by ID
const getDailyLogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailyLog = yield dailyLog_1.DailyLog.findByPk(req.params.id);
        if (dailyLog) {
            res.status(200).json(dailyLog);
        }
        else {
            res.status(404).json({ error: 'Daily log not found' });
        }
    }
    catch (error) {
        console.error('Error fetching daily log:', error);
        res.status(500).json({ error: 'Failed to fetch daily log' });
    }
});
exports.getDailyLogById = getDailyLogById;
// Update a daily log by ID
const updateDailyLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield dailyLog_1.DailyLog.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDailyLog = yield dailyLog_1.DailyLog.findByPk(req.params.id);
            res.status(200).json(updatedDailyLog);
        }
        else {
            res.status(404).json({ error: 'Daily log not found' });
        }
    }
    catch (error) {
        console.error('Error updating daily log:', error);
        res.status(500).json({ error: 'Failed to update daily log' });
    }
});
exports.updateDailyLog = updateDailyLog;
// Delete a daily log by ID
const deleteDailyLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield dailyLog_1.DailyLog.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Daily log deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Daily log not found' });
        }
    }
    catch (error) {
        console.error('Error deleting daily log:', error);
        res.status(500).json({ error: 'Failed to delete daily log' });
    }
});
exports.deleteDailyLog = deleteDailyLog;
