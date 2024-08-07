"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dailyLogController_1 = require("../controllers/dailyLogController");
const router = express_1.default.Router();
router.get('/all', dailyLogController_1.getDailyLogs); // Ensure correct method name
router.get('/user/:userId', dailyLogController_1.getDailyLogsByUserId); // Ensure correct method name
router.post('/user', dailyLogController_1.createDailyLog);
router.put('/:id', dailyLogController_1.updateDailyLog);
router.delete('/:id', dailyLogController_1.deleteDailyLog);
exports.default = router;
