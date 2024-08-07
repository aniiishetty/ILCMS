"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/preScreeningRoutes.ts
const express_1 = require("express");
const PreScreeningController_1 = require("../controllers/PreScreeningController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({});
router.post('/create', PreScreeningController_1.createPreScreening);
router.get('/all', PreScreeningController_1.getPreScreening);
exports.default = router;
