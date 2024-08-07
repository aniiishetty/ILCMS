"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        console.log('No token provided');
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'your_jwt_secret');
        console.log('Decoded token:', decoded);
        req.admin = decoded;
        next();
    }
    catch (ex) {
        console.log('Invalid token');
        res.status(400).send('Invalid token.');
    }
};
exports.authenticate = authenticate;
