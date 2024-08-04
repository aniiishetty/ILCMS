"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const degreeController_1 = require("../controllers/degreeController");
const router = (0, express_1.Router)();
// Route to fetch degree statuses by degree ID
router.get('/degree-statuses', degreeController_1.fetchDegreeStatusesByDegree);
// Route to fetch branches by degree ID
router.get('/branches', degreeController_1.fetchBranchesByDegree);
exports.default = router;
