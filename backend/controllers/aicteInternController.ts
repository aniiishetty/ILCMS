import { Request, Response } from 'express';
import { AicteIntern } from '../models/aicteIntern';
import { User } from '../models/user';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const createAicteIntern = async (req: Request, res: Response) => {
  try {
    // Log the incoming request body
    console.log('Request body:', req.body);

    const { userId, ...data } = req.body;

    // Log the userId and any additional data
    console.log('Received userId:', userId);
    console.log('Additional data:', data);

    // Fetch user details
    console.log('Attempting to find user by ID...');
    const user = await User.findByPk(userId);
    if (!user) {
      console.error('User not found with ID:', userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('User found:', user);

    // Get the resume as a Buffer
    const resume = req.file?.buffer;

    // Log the resume buffer status
    if (resume) {
      console.log('Resume uploaded successfully, size:', resume.length);
    } else {
      console.log('No resume file uploaded');
    }

    // Log the data to be saved
    console.log('Data to be saved to AicteIntern:', {
      ...data,
      userId: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      fullName: user.name,
      resume
    });

    // Create AicteIntern entry
    console.log('Attempting to create AicteIntern entry...');
    const aicteIntern = await AicteIntern.create({
      ...data,
      userId: user.id,
      email: user.email, // Use user details to populate fields
      phoneNumber: user.phoneNumber,
      fullName: user.name,
      resume,
    });

    console.log('AicteIntern created successfully:', aicteIntern);

    res.status(201).json({ success: true, aicteIntern });
  } catch (error) {
    console.error('Error creating AicteIntern:');
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack);
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { createAicteIntern };
