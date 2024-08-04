import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { Degree } from '../models/Degree';
import { DegreeStatus } from '../models/DegreeStatus';
import { BranchModel } from '../models/BranchModel';
import { UploadedFile } from 'express-fileupload';
import { College } from '../models';
import multer from 'multer';


const upload = multer({ storage: multer.memoryStorage() });

type Files = {
  passportPhoto?: Express.Multer.File[];
  aadharProof?: Express.Multer.File[];
};
// Configure the email transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'anishetty391@gmail.com',
    pass: 'dbaqgxwsxmajreyt',
  },
});

// Generate a unique IIMSTC ID
const generateIIMSTCID = async (collegeId: number ): Promise<string> => {
  try {
    const college = await College.findByPk(collegeId);
    

    if (!college) {
      throw new Error(`College with ID ${collegeId} not found`);
    }

    
    const randomNum = Math.floor(100 + Math.random() * 900); // Generate a 3-digit random number
    return `II${college.code}${randomNum}`;
  } catch (error) {
    console.error('Error generating IIMSTC ID:', error);
    throw error;
  }
};



// Generate an OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Register user
const registerUser = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); // Log the entire request body
    console.log('Request files:', req.files); // Log the uploaded files

    const {
      email,
      name,
      dob,
      address,
      collegeId,
      university,
      usn,
      gender,
      semester,
      phoneNumber,
      degreeId,
      degreeStatusId,
      branchId,
      aadharNo,
    } = req.body;

    // Log values for debugging
    console.log('Email:', email);

    // Validate email
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Handle files
    const passportPhoto = (req.files as unknown as { [fieldname: string]: UploadedFile })?.passportPhoto?.data || null;
    const aadharProof = (req.files as unknown as { [fieldname: string]: UploadedFile })?.aadharProof?.data || null;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate unique IIMSTC ID, OTP, and password
    const IIMSTC_ID = await generateIIMSTCID(collegeId);
    const otp = generateOTP();
    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      name,
      dob,
      address,
      collegeId,
      university,
      usn,
      gender,
      semester,
      phoneNumber,
      IIMSTC_ID,
      password: hashedPassword,
      degreeId,
      degreeStatusId,
      branchId,
      aadharNo,
      passportPhoto,
      aadharProof,
      otp, // Store OTP
    });

    // Send OTP email
    const mailOptions = {
      from: 'anishetty391@gmail.com',
      to: email,
      subject: 'IIMSTC Registration OTP Verification',
      text: `Dear ${name},\n\nYour OTP for registration is ${otp}.\n\nRegards,\nIIMSTC Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: 'User registered successfully. An OTP has been sent to your email.' });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Verify OTP
const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email, otp } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or email' });
    }

    // Clear OTP from user record after successful verification
    await user.update({ otp: null });

    // Generate a new temporary password
    const tempPassword = crypto.randomBytes(8).toString('hex');
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    // Update the user's password
    await user.update({ password: hashedTempPassword });

    // Send final email with credentials
    const mailOptions = {
      from: 'anishetty391@gmail.com',
      to: email,
      subject: 'IIMSTC Registration Successful',
      text: `Dear ${user.name},\n\nYour registration was successful. Your IIMSTC ID is ${user.IIMSTC_ID} and your temporary password is ${tempPassword}.\n\nPlease login and change your password.\n\nRegards,\nIIMSTC Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'OTP verified successfully. Credentials have been sent to your email.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const { IIMSTC_ID, password } = req.body;

    // Find user by IIMSTC_ID
    const user = await User.findOne({ where: { IIMSTC_ID } });
    if (!user) {
      console.error('Invalid IIMSTC ID:', IIMSTC_ID);
      return res.status(400).json({ message: 'Invalid IIMSTC ID or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Invalid password for IIMSTC ID:', IIMSTC_ID);
      return res.status(400).json({ message: 'Invalid IIMSTC ID or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ IIMSTC_ID: user.IIMSTC_ID }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Generated JWT token for IIMSTC ID:', IIMSTC_ID, 'Token:', token);

    // Respond with user details (excluding password)
    const userDetails = {
      id: user.id,
      IIMSTC_ID: user.IIMSTC_ID,
      email: user.email,
      name: user.name,
      
    };

    return res.status(200).json({ message: 'Login successful', user: userDetails, token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch user profile by IIMSTC_ID
const fetchUserProfile = async (req: Request, res: Response) => {
  const { IIMSTC_ID } = req.body;

  if (!IIMSTC_ID || typeof IIMSTC_ID !== 'string') {
    console.log('Invalid IIMSTC ID:', IIMSTC_ID);
    return res.status(400).json({ success: false, error: 'IIMSTC ID is required and must be a string' });
  }

  try {
    console.log('Fetching user profile for IIMSTC ID:', IIMSTC_ID);
    const user = await User.findOne({
      where: { IIMSTC_ID },
      include: [
        { model: Degree, as: 'degreeDetails' },
        { model: College, as: 'collegeDetails' },
        { model: DegreeStatus, as: 'degreeStatusDetails' },
        { model: BranchModel, as: 'branchDetails' },
      ],
    });
    if (!user) {
      console.log('User not found for IIMSTC ID:', IIMSTC_ID);
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Exclude password from response
    const { password: _, ...userProfile } = user.toJSON();

    // Log the user profile that is fetched
    console.log('User profile fetched:', userProfile);

    res.status(200).json({ success: true, user: userProfile });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Update user profile

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    // Get the user's details from the request body
    const {
      IIMSTC_ID,
      name,
      dob,
      address,
      collegeId,
      university,
      usn,
      gender,
      semester,
      phoneNumber,
      degreeId,
      degreeStatusId,
      branchId,
    } = req.body;

    // Get the uploaded files
    const files = req.files as any;
    const passportPhoto = files.passportPhoto?.[0]?.buffer || null;
    const aadharProof = files.aadharProof?.[0]?.buffer || null;

    // Check if IIMSTC_ID is provided
    if (!IIMSTC_ID) {
      return res.status(400).json({ success: false, error: 'IIMSTC ID is required' });
    }

    // Find the user by IIMSTC_ID
    const user = await User.findOne({ where: { IIMSTC_ID } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update user profile fields
    if (name) user.name = name;
    if (dob) user.dob = dob;
    if (address) user.address = address;
    if (collegeId) user.collegeId = collegeId;
    if (university) user.university = university;
    if (usn) user.usn = usn;
    if (gender) user.gender = gender;
    if (semester) user.semester = semester;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (degreeId) user.degreeId = degreeId;
    if (degreeStatusId) user.degreeStatusId = degreeStatusId;
    if (branchId) user.branchId = branchId;
    if (passportPhoto) user.passportPhoto = passportPhoto;
    if (aadharProof) user.aadharProof = aadharProof;

    // Save the updated user profile
    await user.save();

    // Log the updated user profile
    console.log('Updated user profile:', user);

    // Return a success response
    res.status(200).json({ success: true, message: 'User profile updated successfully', user });
  } catch (error: any) {
    // Log the error
    console.error('Error updating user profile:', error);

    // Return an error response
    if (error instanceof Error && error.message.includes('Unexpected end of form')) {
      res.status(400).json({ success: false, error: 'Invalid request payload' });
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
};


export { registerUser, loginUser, fetchUserProfile, updateUserProfile, verifyOTP };
