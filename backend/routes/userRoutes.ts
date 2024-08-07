import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, fetchUserProfile, updateUserProfile, verifyOTP, getCurrentUserByIIMSTC_ID, getAllUsers, getUserById } from '../controllers/userController';
const router = express.Router();
const app = express();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
  });
  
// Route for user registration without passport photo upload
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);

// Route for fetching user profile
router.post('/profile', fetchUserProfile);
router.get('/all', getAllUsers);

// Route for updating user profile with optional passport photo upload
router.post('/update-profile', upload.fields([{ name: 'passportPhoto' }, { name: 'aadharProof' }]), updateUserProfile);
router.get('/current-user', getCurrentUserByIIMSTC_ID)

// Route for getting a user by ID
router.get('/:id', getUserById);

export default router;
