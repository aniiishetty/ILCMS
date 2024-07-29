import { Request, Response } from 'express';
import { AicteIntern } from '../models/aicteIntern';

// Create a new AICTE Intern
export const createAicteIntern = async (req: Request, res: Response) => {
  try {
    const {
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
      internshipPreferences,
      learningObjectives,
      technicalSkills,
      internshipActivities,
      evidenceToFaculty,
      userId,
    } = req.body;

    const resume = req.file ? req.file.buffer : null;

    const aicteIntern = await AicteIntern.create({
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
  } catch (error) {
    console.error('Error creating AICTE Intern:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
