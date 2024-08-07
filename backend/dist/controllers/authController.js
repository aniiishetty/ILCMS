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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createCredentials = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Admin_1 = __importDefault(require("../models/Admin"));
const jwt_1 = require("../utils/jwt");
const createCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, roleId } = req.body;
    // Check if all required fields are provided
    if (!username || !password || roleId === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        // Hash the password before saving it
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new admin record with the hashed password
        const newAdmin = yield Admin_1.default.create({
            username,
            password: hashedPassword, // Save the hashed password
            roleId,
        });
        console.log(`New credentials created for username: ${username}`);
        return res.status(201).json({ message: 'Credentials created successfully', admin: newAdmin });
    }
    catch (err) {
        console.error('Error creating credentials:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.createCredentials = createCredentials;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log('Password input:', password);
    try {
        // Find the admin record with the provided username
        const admin = yield Admin_1.default.findOne({ where: { username } });
        console.log('Admin record found:', admin);
        if (!admin) {
            console.log('Admin record not found');
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // If the password is valid, return a success response
        const token = (0, jwt_1.generateToken)(admin.id, admin.roleId);
        res.send({ token });
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.login = login;
