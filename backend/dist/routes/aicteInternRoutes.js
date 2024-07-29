"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const aicteInternController_1 = require("../controllers/aicteInternController");
const router = express_1.default.Router();
// Setup multer for handling file uploads
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Route to handle AICTE Intern form submission
router.post('/create', upload.single('resume'), aicteInternController_1.createAicteIntern);
exports.default = router;
