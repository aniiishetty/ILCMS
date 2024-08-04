import express from 'express';
import { fetchColleges, fetchDegrees, fetchBranches, fetchDegreeStatuses } from '../controllers/collegeController';

const router = express.Router();

router.get('/colleges', fetchColleges);
router.get('/degrees', fetchDegrees);
router.get('/branches', fetchBranches);
router.get('/degree-statuses', fetchDegreeStatuses);

export default router;
