import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const register = async (details: any) => {
  if (!details.password) throw new Error('Password is required');

  const hashedPassword = await bcrypt.hash(details.password, 10);
  const user = await User.create({ ...details, password: hashedPassword });
  return user;
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  return user;
};

const registerUser = async (req: Request, res: Response) => {
  console.log(req.body); // Log the request body for debugging

  const {
    name,
    email,
    dob,
    address,
    collegeName,
    university,
    usn,
    verificationType,
    verificationId,
    password,
    gender,
    branch,
    semester,
    phoneNumber,
  } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, error: 'Password is required' });
  }

  try {
    const user = await register({
      name,
      email,
      dob,
      address,
      collegeName,
      university,
      usn,
      verificationType,
      verificationId,
      password,
      gender,
      branch,
      semester,
      phoneNumber,
    });
    res.status(201).json({ success: true, user });
  } catch (error: any) {
    console.error('Error registering user:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};


const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.error('Error logging in user:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const fetchUserProfile = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const { password: _, ...userProfile } = user.toJSON();
    res.status(200).json({ success: true, user: userProfile });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  const {
    email,
    name,
    dob,
    address,
    collegeName,
    university,
    usn,
    verificationType,
    verificationId,
    gender,
    branch,
    semester,
    phoneNumber,
  } = req.body;

  const passportPhoto = req.file?.buffer;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const updatedFields: any = {
      name,
      dob,
      address,
      collegeName,
      university,
      usn,
      verificationType,
      verificationId,
      gender,
      branch,
      semester,
      phoneNumber,
    };

    if (passportPhoto) {
      updatedFields.passportPhoto = passportPhoto;
    }

    await user.update(updatedFields);

    const { password: _, ...updatedUserProfile } = user.toJSON();
    res.status(200).json({ success: true, user: updatedUserProfile });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { registerUser, loginUser, fetchUserProfile, updateUserProfile };
