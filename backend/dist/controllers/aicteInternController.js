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
exports.getAicteInternById = exports.createAicteIntern = void 0;
const aicteIntern_1 = require("../models/aicteIntern");
// Create a new AICTE Intern
const createAicteIntern = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phoneNumber, fullName, homeAddress, rollNumber, academicConcentration, overallGPA, semester, academicYear, schoolName, schoolCityState, campusAddress, campusPhoneNumber, campusFaxNumber, schoolEmail, hodName, hodEmail, internshipPreferences, learningObjectives, technicalSkills, internshipActivities, evidenceToFaculty, userId, } = req.body;
        const resume = req.file ? req.file.buffer : null;
        const aicteIntern = yield aicteIntern_1.AicteIntern.create({
            email,
            phoneNumber,
            fullName,
            homeAddress,
            rollNumber,
            academicConcentration,
            overallGPA,
            semester,
            academicYear,
            schoolName,
            schoolCityState,
            campusAddress,
            campusPhoneNumber,
            campusFaxNumber,
            schoolEmail,
            hodName,
            hodEmail,
            resume,
            internshipPreferences,
            learningObjectives,
            technicalSkills,
            internshipActivities,
            evidenceToFaculty,
            userId,
        });
        return res.status(201).json(aicteIntern);
    }
    catch (error) {
        console.error('Error creating AICTE Intern:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createAicteIntern = createAicteIntern;
const getAicteInternById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(`Fetching AICTE Intern with ID: ${id}`); // Logging the ID being fetched
        const aicteIntern = yield aicteIntern_1.AicteIntern.findByPk(id, {
            attributes: ['hodName', 'hodEmail'] // Specify the fields to return
        });
        if (!aicteIntern) {
            console.log(`AICTE Intern with ID ${id} not found`); // Log if the intern is not found
            return res.status(404).json({ error: 'AICTE Intern not found' });
        }
        console.log(`Fetched AICTE Intern: ${JSON.stringify(aicteIntern)}`); // Log the fetched intern data
        return res.status(200).json(aicteIntern);
    }
    catch (error) {
        console.error('Error retrieving AICTE Intern:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAicteInternById = getAicteInternById;
