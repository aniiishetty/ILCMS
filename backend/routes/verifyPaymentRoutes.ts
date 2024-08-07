import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { User } from '../models/user';
import { Payment } from '../models/payment';

const router = express.Router();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other email services
    auth: {
        user: 'anishetty391@gmail.com', // Use environment variable for sensitive data
                pass: 'dbaqgxwsxmajreyt',// Your email password
    }
});

interface VerifyPaymentRequest extends Request {
    body: {
        paymentId: number;
        userId: number;
        action: 'approve' | 'decline';
    };
}

router.post('/verify', async (req: VerifyPaymentRequest, res: Response) => {
    const { paymentId, userId, action } = req.body;

    if (!paymentId || !userId || !action) {
        return res.status(400).json({ message: 'Payment ID, user ID, and action are required' });
    }

    try {
        // Update payment status based on the action
        const updatedStatus = action === 'approve' ? 'verified' : 'declined';
        await Payment.update({ status: updatedStatus }, { where: { id: paymentId } });

        // Fetch the user's email
        const user = await User.findOne({ where: { id: userId } });
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

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: `Payment ${action} and email sent` });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
