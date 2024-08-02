"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dailyLogController_1 = require("../controllers/dailyLogController");
const router = (0, express_1.Router)();
// Route to create a new daily log
router.post('/', dailyLogController_1.createDailyLog);
// Route to get all daily logs
router.get('/', dailyLogController_1.getAllDailyLogs);
// Route to get a daily log by ID
router.get('/:id', dailyLogController_1.getDailyLogById);
// Route to update a daily log by ID
router.put('/:id', dailyLogController_1.updateDailyLog);
// Route to delete a daily log by ID
router.delete('/:id', dailyLogController_1.deleteDailyLog);
exports.default = router;
