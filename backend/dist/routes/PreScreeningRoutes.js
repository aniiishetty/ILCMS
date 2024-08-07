"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/preScreeningRoutes.ts
const express_1 = require("express");
const PreScreeningController_1 = require("../controllers/PreScreeningController");
const router = (0, express_1.Router)();
router.post('/create', PreScreeningController_1.createPreScreening);
exports.default = router;
