"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBranchesByDegree = exports.fetchDegreeStatusesByDegree = void 0;
const DegreeStatus_1 = require("../models/DegreeStatus");
const BranchModel_1 = require("../models/BranchModel");
// Fetch degree statuses by degree ID
const fetchDegreeStatusesByDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { degreeId } = req.query;
        if (!degreeId || typeof degreeId !== 'string') {
            return res.status(400).json({ message: 'Degree ID is required and must be a string' });
        }
        // Fetch degree statuses from the database
        const degreeStatuses = yield DegreeStatus_1.DegreeStatus.findAll({
            where: { degreeId }
        });
        res.status(200).json(degreeStatuses);
    }
    catch (error) {
        console.error('Error fetching degree statuses:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.fetchDegreeStatusesByDegree = fetchDegreeStatusesByDegree;
// Fetch branches by degree ID
const fetchBranchesByDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { degreeId } = req.query;
        if (!degreeId || typeof degreeId !== 'string') {
            return res.status(400).json({ message: 'Degree ID is required and must be a string' });
        }
        // Fetch branches from the database
        const branches = yield BranchModel_1.BranchModel.findAll({
            where: { degreeId }
        });
        res.status(200).json(branches);
    }
    catch (error) {
        console.error('Error fetching branches:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.fetchBranchesByDegree = fetchBranchesByDegree;
