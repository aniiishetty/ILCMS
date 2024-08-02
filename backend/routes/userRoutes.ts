import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, fetchUserProfile, updateUserProfile, verifyOTP } from '../controllers/userController';
const router = express.Router();
const upload = multer(); // Initialize multer without any specific storage configuration

// Route for user registration without passport photo upload
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);

// Route for fetching user profile
router.post('/profile', fetchUserProfile);

// Route for updating user profile with optional passport photo upload
router.put('/update-profile', upload.single('passportPhoto'), updateUserProfile);

// Route for getting a user by ID
// router.get('/:id', getUserById);

export default router;
