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
exports.updateUserProfile = exports.fetchUserProfile = exports.loginUser = exports.registerUser = exports.getUserById = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const register = (details) => __awaiter(void 0, void 0, void 0, function* () {
    if (!details.password)
        throw new Error('Password is required');
    const hashedPassword = yield bcrypt_1.default.hash(details.password, 10);
    const user = yield user_1.User.create(Object.assign(Object.assign({}, details), { password: hashedPassword }));
    return user;
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({ where: { email } });
    if (!user)
        throw new Error('User not found');
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid password');
    return user;
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body); // Log the request body for debugging
    const { name, email, dob, address, collegeName, university, usn, verificationType, verificationId, password, gender, branch, semester, phoneNumber, } = req.body;
    if (!password) {
        return res.status(400).json({ success: false, error: 'Password is required' });
    }
    try {
        const user = yield register({
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
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield login(email, password);
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.loginUser = loginUser;
const fetchUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
    }
    try {
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        const _a = user.toJSON(), { password: _ } = _a, userProfile = __rest(_a, ["password"]);
        res.status(200).json({ success: true, user: userProfile });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
exports.fetchUserProfile = fetchUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, name, dob, address, collegeName, university, usn, verificationType, verificationId, gender, branch, semester, phoneNumber, } = req.body;
    const passportPhoto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
    }
    try {
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        const updatedFields = {
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
        yield user.update(updatedFields);
        const _b = user.toJSON(), { password: _ } = _b, updatedUserProfile = __rest(_b, ["password"]);
        res.status(200).json({ success: true, user: updatedUserProfile });
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
exports.updateUserProfile = updateUserProfile;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = yield user_1.User.findByPk(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserById = getUserById;
