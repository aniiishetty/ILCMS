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
exports.createAicteIntern = void 0;
const aicteIntern_1 = require("../models/aicteIntern");
const user_1 = require("../models/user");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const createAicteIntern = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Log the incoming request body
        console.log('Request body:', req.body);
        const _b = req.body, { userId } = _b, data = __rest(_b, ["userId"]);
        // Log the userId and any additional data
        console.log('Received userId:', userId);
        console.log('Additional data:', data);
        // Fetch user details
        console.log('Attempting to find user by ID...');
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            console.error('User not found with ID:', userId);
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log('User found:', user);
        // Get the resume as a Buffer
        const resume = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        // Log the resume buffer status
        if (resume) {
            console.log('Resume uploaded successfully, size:', resume.length);
        }
        else {
            console.log('No resume file uploaded');
        }
        // Log the data to be saved
        console.log('Data to be saved to AicteIntern:', Object.assign(Object.assign({}, data), { userId: user.id, email: user.email, phoneNumber: user.phoneNumber, fullName: user.name, resume }));
        // Create AicteIntern entry
        console.log('Attempting to create AicteIntern entry...');
        const aicteIntern = yield aicteIntern_1.AicteIntern.create(Object.assign(Object.assign({}, data), { userId: user.id, email: user.email, phoneNumber: user.phoneNumber, fullName: user.name, resume }));
        console.log('AicteIntern created successfully:', aicteIntern);
        res.status(201).json({ success: true, aicteIntern });
    }
    catch (error) {
        console.error('Error creating AicteIntern:');
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
        if (error instanceof Error) {
            console.error('Stack trace:', error.stack);
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.createAicteIntern = createAicteIntern;
