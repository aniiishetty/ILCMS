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
exports.fetchDegreeStatuses = exports.fetchBranches = exports.fetchDegrees = exports.fetchColleges = void 0;
const Colleges_1 = require("../models/Colleges");
const Degree_1 = require("../models/Degree");
const BranchModel_1 = require("../models/BranchModel");
const DegreeStatus_1 = require("../models/DegreeStatus");
// Fetch all colleges
const fetchColleges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colleges = yield Colleges_1.College.findAll();
        res.status(200).json(colleges);
    }
    catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.fetchColleges = fetchColleges;
// Fetch all degrees
const fetchDegrees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const degrees = yield Degree_1.Degree.findAll();
        res.status(200).json(degrees);
    }
    catch (error) {
        console.error('Error fetching degrees:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.fetchDegrees = fetchDegrees;
// Fetch all branches
const fetchBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield BranchModel_1.BranchModel.findAll();
        res.status(200).json(branches);
    }
    catch (error) {
        console.error('Error fetching branches:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.fetchBranches = fetchBranches;
// Fetch all degree statuses
const fetchDegreeStatuses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const degreeStatuses = yield DegreeStatus_1.DegreeStatus.findAll();
        res.status(200).json(degreeStatuses);
    }
    catch (error) {
        console.error('Error fetching degree statuses:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.fetchDegreeStatuses = fetchDegreeStatuses;
