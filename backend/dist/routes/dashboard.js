"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
router.get('/finance', auth_1.authenticate, dashboardController_1.getFinanceDashboard);
router.get('/internship', auth_1.authenticate, dashboardController_1.getInternshipDashboard);
router.get('/management', auth_1.authenticate, dashboardController_1.getManagementDashboard);
router.get('/faculty', auth_1.authenticate, dashboardController_1.getFacultyDashboard);
router.get('/dashboard', auth_1.authenticate, dashboardController_1.getDashboardRole); // Add the new route
exports.default = router;
