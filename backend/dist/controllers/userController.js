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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.updateUserProfile = exports.fetchUserProfile = exports.loginUser = exports.registerUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Degree_1 = require("../models/Degree");
const DegreeStatus_1 = require("../models/DegreeStatus");
const BranchModel_1 = require("../models/BranchModel");
const models_1 = require("../models");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Configure the email transport
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: 'anishetty391@gmail.com',
        pass: 'dbaqgxwsxmajreyt',
    },
});
// Generate a unique IIMSTC ID
const generateIIMSTCID = (collegeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const college = yield models_1.College.findByPk(collegeId);
        if (!college) {
            throw new Error(`College with ID ${collegeId} not found`);
        }
        const randomNum = Math.floor(100 + Math.random() * 900); // Generate a 3-digit random number
        return `II${college.code}${randomNum}`;
    }
    catch (error) {
        console.error('Error generating IIMSTC ID:', error);
        throw error;
    }
});
// Generate an OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};
// Register user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        console.log('Request body:', req.body); // Log the entire request body
        console.log('Request files:', req.files); // Log the uploaded files
        const { email, name, dob, address, collegeId, university, usn, gender, semester, phoneNumber, degreeId, degreeStatusId, branchId, aadharNo, } = req.body;
        // Log values for debugging
        console.log('Email:', email);
        // Validate email
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        // Handle files
        const passportPhoto = ((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.passportPhoto) === null || _b === void 0 ? void 0 : _b.data) || null;
        const aadharProof = ((_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.aadharProof) === null || _d === void 0 ? void 0 : _d.data) || null;
        // Check if user already exists
        const existingUser = yield user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Generate unique IIMSTC ID, OTP, and password
        const IIMSTC_ID = yield generateIIMSTCID(collegeId);
        const otp = generateOTP();
        const password = crypto_1.default.randomBytes(8).toString('hex');
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new user
        const newUser = yield user_1.User.create({
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
        yield transporter.sendMail(mailOptions);
        return res.status(201).json({ message: 'User registered successfully. An OTP has been sent to your email.' });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.registerUser = registerUser;
// Verify OTP
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const user = yield user_1.User.findOne({ where: { email, otp } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or email' });
        }
        // Clear OTP from user record after successful verification
        yield user.update({ otp: null });
        // Generate a new temporary password
        const tempPassword = crypto_1.default.randomBytes(8).toString('hex');
        const hashedTempPassword = yield bcrypt_1.default.hash(tempPassword, 10);
        // Update the user's password
        yield user.update({ password: hashedTempPassword });
        // Send final email with credentials
        const mailOptions = {
            from: 'anishetty391@gmail.com',
            to: email,
            subject: 'IIMSTC Registration Successful',
            text: `Dear ${user.name},\n\nYour registration was successful. Your IIMSTC ID is ${user.IIMSTC_ID} and your temporary password is ${tempPassword}.\n\nPlease login and change your password.\n\nRegards,\nIIMSTC Team`,
        };
        yield transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'OTP verified successfully. Credentials have been sent to your email.' });
    }
    catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.verifyOTP = verifyOTP;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { IIMSTC_ID, password } = req.body;
        // Find user by IIMSTC_ID
        const user = yield user_1.User.findOne({ where: { IIMSTC_ID } });
        if (!user) {
            console.error('Invalid IIMSTC ID:', IIMSTC_ID);
            return res.status(400).json({ message: 'Invalid IIMSTC ID or password' });
        }
        // Check password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            console.error('Invalid password for IIMSTC ID:', IIMSTC_ID);
            return res.status(400).json({ message: 'Invalid IIMSTC ID or password' });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ IIMSTC_ID: user.IIMSTC_ID }, 'your_jwt_secret', { expiresIn: '1h' });
        console.log('Generated JWT token for IIMSTC ID:', IIMSTC_ID, 'Token:', token);
        // Respond with user details (excluding password)
        const userDetails = {
            id: user.id,
            IIMSTC_ID: user.IIMSTC_ID,
            email: user.email,
            name: user.name,
        };
        return res.status(200).json({ message: 'Login successful', user: userDetails, token });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
// Fetch user profile by IIMSTC_ID
const fetchUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IIMSTC_ID } = req.body;
    if (!IIMSTC_ID || typeof IIMSTC_ID !== 'string') {
        console.log('Invalid IIMSTC ID:', IIMSTC_ID);
        return res.status(400).json({ success: false, error: 'IIMSTC ID is required and must be a string' });
    }
    try {
        console.log('Fetching user profile for IIMSTC ID:', IIMSTC_ID);
        const user = yield user_1.User.findOne({
            where: { IIMSTC_ID },
            include: [
                { model: Degree_1.Degree, as: 'degreeDetails' },
                { model: models_1.College, as: 'collegeDetails' },
                { model: DegreeStatus_1.DegreeStatus, as: 'degreeStatusDetails' },
                { model: BranchModel_1.BranchModel, as: 'branchDetails' },
            ],
        });
        if (!user) {
            console.log('User not found for IIMSTC ID:', IIMSTC_ID);
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        // Exclude password from response
        const _a = user.toJSON(), { password: _ } = _a, userProfile = __rest(_a, ["password"]);
        // Log the user profile that is fetched
        console.log('User profile fetched:', userProfile);
        res.status(200).json({ success: true, user: userProfile });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
exports.fetchUserProfile = fetchUserProfile;
// Update user profile
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        // Get the user's details from the request body
        const { IIMSTC_ID, name, dob, address, collegeId, university, usn, gender, semester, phoneNumber, degreeId, degreeStatusId, branchId, } = req.body;
        // Get the uploaded files
        const files = req.files;
        const passportPhoto = ((_b = (_a = files.passportPhoto) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.buffer) || null;
        const aadharProof = ((_d = (_c = files.aadharProof) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.buffer) || null;
        // Check if IIMSTC_ID is provided
        if (!IIMSTC_ID) {
            return res.status(400).json({ success: false, error: 'IIMSTC ID is required' });
        }
        // Find the user by IIMSTC_ID
        const user = yield user_1.User.findOne({ where: { IIMSTC_ID } });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        // Update user profile fields
        if (name)
            user.name = name;
        if (dob)
            user.dob = dob;
        if (address)
            user.address = address;
        if (collegeId)
            user.collegeId = collegeId;
        if (university)
            user.university = university;
        if (usn)
            user.usn = usn;
        if (gender)
            user.gender = gender;
        if (semester)
            user.semester = semester;
        if (phoneNumber)
            user.phoneNumber = phoneNumber;
        if (degreeId)
            user.degreeId = degreeId;
        if (degreeStatusId)
            user.degreeStatusId = degreeStatusId;
        if (branchId)
            user.branchId = branchId;
        if (passportPhoto)
            user.passportPhoto = passportPhoto;
        if (aadharProof)
            user.aadharProof = aadharProof;
        // Save the updated user profile
        yield user.save();
        // Log the updated user profile
        console.log('Updated user profile:', user);
        // Return a success response
        res.status(200).json({ success: true, message: 'User profile updated successfully', user });
    }
    catch (error) {
        // Log the error
        console.error('Error updating user profile:', error);
        // Return an error response
        if (error instanceof Error && error.message.includes('Unexpected end of form')) {
            res.status(400).json({ success: false, error: 'Invalid request payload' });
        }
        else {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
});
exports.updateUserProfile = updateUserProfile;
