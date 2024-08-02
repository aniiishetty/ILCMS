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
export const getAicteInternById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`Fetching AICTE Intern with ID: ${id}`); // Logging the ID being fetched

    const aicteIntern = await AicteIntern.findByPk(id, {
      attributes: ['hodName', 'hodEmail'] // Specify the fields to return
    });

    if (!aicteIntern) {
      console.log(`AICTE Intern with ID ${id} not found`); // Log if the intern is not found
      return res.status(404).json({ error: 'AICTE Intern not found' });
    }

    console.log(`Fetched AICTE Intern: ${JSON.stringify(aicteIntern)}`); // Log the fetched intern data
    return res.status(200).json(aicteIntern);
  } catch (error) {
    console.error('Error retrieving AICTE Intern:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
