import { Request, Response } from 'express';
import { StudentPhoto } from '../models/studentPhoto';
import { User } from '../models/user';
import multer from 'multer';

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

export const uploadPhoto = async (req: Request, res: Response) => {
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);

  const userId = req.body.userId || req.body.id; // Handle both 'userId' and 'id'

  if (!req.file || !userId) {
    return res.status(400).send('No file uploaded or user ID missing.');
  }

  try {
    const photo = req.file.buffer; // Binary data of the photo

    // Ensure the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Create or update the student photo
    await StudentPhoto.upsert({
      userId,
      photo,
    });

    res.send('Photo uploaded successfully.');
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).send('An error occurred while uploading the photo.');
  }
};

export const getPhotoByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const studentPhoto = await StudentPhoto.findOne({ where: { userId } });
    if (!studentPhoto) {
      return res.status(404).send('Photo not found.');
    }

    res.set('Content-Type', 'image/jpeg'); // Adjust according to the image type
    res.send(studentPhoto.photo); // Send photo binary data
  } catch (error) {
    console.error('Error retrieving photo:', error);
    res.status(500).send('An error occurred while retrieving the photo.');
  }
};

export const deletePhotoByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const studentPhoto = await StudentPhoto.findOne({ where: { userId } });
    if (!studentPhoto) {
      return res.status(404).send('Photo not found.');
    }

    await studentPhoto.destroy();
    res.send('Photo deleted successfully.');
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).send('An error occurred while deleting the photo.');
  }
};
