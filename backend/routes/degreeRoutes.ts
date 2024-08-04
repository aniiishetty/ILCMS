import { Router } from 'express';
import { fetchDegreeStatusesByDegree, fetchBranchesByDegree } from '../controllers/degreeController';

const router = Router();

// Route to fetch degree statuses by degree ID
router.get('/degree-statuses', fetchDegreeStatusesByDegree);

// Route to fetch branches by degree ID
router.get('/branches', fetchBranchesByDegree);

export default router;
