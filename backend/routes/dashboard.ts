import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
    getFinanceDashboard,
    getInternshipDashboard,
    getManagementDashboard,
    getFacultyDashboard,
    getDashboardRole // Import the new controller
} from '../controllers/dashboardController';

const router = Router();

router.get('/finance', authenticate, getFinanceDashboard);
router.get('/internship', authenticate, getInternshipDashboard);
router.get('/management', authenticate, getManagementDashboard);
router.get('/faculty', authenticate, getFacultyDashboard);
router.get('/dashboard', authenticate, getDashboardRole); // Add the new route

export default router;
