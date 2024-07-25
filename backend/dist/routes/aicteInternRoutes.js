"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const aicteInternController_1 = require("../controllers/aicteInternController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.post('/aicte-interns', upload.single('resume'), aicteInternController_1.createAicteIntern);
exports.default = router;
