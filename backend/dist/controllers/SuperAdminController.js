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
exports.loginSuperAdmin = exports.registerSuperAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const superAdmins_1 = __importDefault(require("../models/superAdmins"));
const Role_1 = __importDefault(require("../models/Role"));
require('dotenv').config(); // Add this line to load environment variables from.env file
const registerSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, rolesId } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const role = yield Role_1.default.findByPk(rolesId);
        if (!role)
            return res.status(400).json({ error: 'Invalid role ID' });
        const superAdmin = yield superAdmins_1.default.create({ email, password: hashedPassword, rolesId });
        res.status(201).json({ message: 'SuperAdmin created successfully', superAdmin });
    }
    catch (err) {
        console.error('Error creating SuperAdmin:', err);
        res.status(500).json({ error: 'SuperAdmin creation failed' });
    }
});
exports.registerSuperAdmin = registerSuperAdmin;
const loginSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const superAdmin = yield superAdmins_1.default.findOne({ where: { email } });
        if (!superAdmin) {
            return res.status(404).json({ error: 'SuperAdmin not found' });
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, superAdmin.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not set');
        }
        const token = jsonwebtoken_1.default.sign({ superAdminId: superAdmin.id, role: superAdmin.rolesId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        console.error('Error logging in SuperAdmin:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.loginSuperAdmin = loginSuperAdmin;
