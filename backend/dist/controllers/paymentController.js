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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayments = exports.createPayment = void 0;
const payment_1 = require("../models/payment");
const user_1 = require("../models/user");
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, paymentMode, utrNo, userId } = req.body;
    // Retrieve file from request
    const referenceFile = ((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.referenceFile) === null || _b === void 0 ? void 0 : _b.data) || null;
    try {
        // Check if user exists
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Prepare payment data
        const paymentData = {
            name,
            paymentMode,
            utrNo,
            referenceFile: referenceFile || Buffer.from(''), // Default to empty buffer if no file is uploaded
            userId,
            status: 'pending', // Default status
        };
        // Create payment entry
        const payment = yield payment_1.Payment.create(paymentData);
        res.status(201).json({ message: 'Payment created successfully', payment });
    }
    catch (error) {
        console.error('Error creating payment:', error); // Log error for debugging
        // Type guard to handle error
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error creating payment', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred', error: 'Unknown error' });
        }
    }
});
exports.createPayment = createPayment;
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield payment_1.Payment.findAll({ include: [{ model: user_1.User, as: 'user' }] });
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving payments', error });
    }
});
exports.getAllPayments = getAllPayments;
