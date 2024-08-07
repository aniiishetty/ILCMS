"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/auth.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/login', authController_1.login);
router.post('/create', authController_1.createCredentials);
exports.default = router;
