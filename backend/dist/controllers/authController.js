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
exports.loginAdmin = exports.registerAdmin = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Service functions
const register = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const admin = yield models_1.Admin.create({ Username: username, password: hashedPassword });
    return admin;
});
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield models_1.Admin.findOne({ where: { Username: username } });
    if (!admin)
        throw new Error('Admin not found');
    const isMatch = yield bcrypt_1.default.compare(password, admin.password);
    if (!isMatch)
        throw new Error('Invalid password');
    return admin;
});
// Controller functions
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const admin = yield register(username, password);
        res.status(201).json(admin);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const admin = yield login(username, password);
        res.status(200).json(admin);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginAdmin = loginAdmin;
