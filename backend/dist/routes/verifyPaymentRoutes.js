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
const user_1 = require("../models/user");
const payment_1 = require("../models/payment");
const router = express_1.default.Router();
// Setup Nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail', // You can use other email services
    auth: {
        user: 'anishetty391@gmail.com', // Use environment variable for sensitive data
        pass: 'dbaqgxwsxmajreyt', // Your email password
    }
});
router.post('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId, userId, action } = req.body;
    if (!paymentId || !userId || !action) {
        return res.status(400).json({ message: 'Payment ID, user ID, and action are required' });
    }
    try {
        // Update payment status based on the action
        const updatedStatus = action === 'approve' ? 'verified' : 'declined';
        yield payment_1.Payment.update({ status: updatedStatus }, { where: { id: paymentId } });
        // Fetch the user's email
        const user = yield user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send email
        const mailOptions = {
            from: 'anishetty391@gmail.com',
            to: user.email,
            subject: `Payment ${action.charAt(0).toUpperCase() + action.slice(1)} Notification`,
            text: `Your payment with ID ${paymentId} has been ${action} successfully.`
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: `Payment ${action} and email sent` });
    }
    catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
