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
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = require("../models/user"); // Adjust the path according to your project structure
const router = express_1.default.Router();
router.post('/sendMail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, action } = req.body;
    try {
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: 'anishetty391@gmail.com',
                pass: 'dbaqgxwsxmajreyt',
            },
        });
        const mailOptions = {
            from: 'anishetty391@gmail.com',
            to: user.email,
            subject: action === 'approve' ? 'Internship Approved' : 'Internship Declined',
            text: action === 'approve'
                ? `Dear ${user.name},\n\nYour internship has been approved.\n\nBest Regards,\nYour Company`
                : `Dear ${user.name},\n\nYour internship has been declined.\n\nBest Regards,\nYour Company`,
        };
        yield transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Error sending email' });
    }
}));
exports.default = router;
