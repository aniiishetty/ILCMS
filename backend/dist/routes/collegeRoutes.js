"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collegeController_1 = require("../controllers/collegeController");
const router = express_1.default.Router();
router.get('/colleges', collegeController_1.fetchColleges);
router.get('/degrees', collegeController_1.fetchDegrees);
router.get('/branches', collegeController_1.fetchBranches);
router.get('/degree-statuses', collegeController_1.fetchDegreeStatuses);
exports.default = router;
