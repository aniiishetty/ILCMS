"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)(); // Initialize multer without any specific storage configuration
// Route for user registration without passport photo upload
router.post('/register', userController_1.registerUser);
// Route for user login
router.post('/login', userController_1.loginUser);
router.post('/verify-otp', userController_1.verifyOTP);
// Route for fetching user profile
router.post('/profile', userController_1.fetchUserProfile);
// Route for updating user profile with optional passport photo upload
router.put('/update-profile', upload.single('passportPhoto'), userController_1.updateUserProfile);
// Route for getting a user by ID
// router.get('/:id', getUserById);
exports.default = router;
