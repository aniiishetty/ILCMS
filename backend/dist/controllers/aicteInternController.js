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
exports.createAicteIntern = void 0;
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
