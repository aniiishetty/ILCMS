import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { User } from '../models/user'; // Adjust the path according to your project structure

const router = express.Router();

interface SendMailRequest extends Request {
    body: {
        userId: number;
        action: 'approve' | 'decline';
    };
}

router.post('/sendMail', async (req: SendMailRequest, res: Response) => {
    const { userId, action } = req.body;

    if (!userId || !action) {
        return res.status(400).json({ success: false, message: 'Invalid request parameters' });
    }

    try {
        // Fetch the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'anishetty391@gmail.com', // Use environment variable for sensitive data
                pass: 'dbaqgxwsxmajreyt', // Use environment variable for sensitive data
            },
        });

        // Define the mail options based on the action
        const mailOptions = {
            from: 'anishetty391@gmail.com',
            to: user.email,
            subject: action === 'approve' ? 'Internship Approved' : 'Internship Declined',
            text: action === 'approve'
                ? `Dear ${user.name},\n\nYour internship has been approved.\n\nBest Regards,\nYour Company`
                : `Dear ${user.name},\n\nYour internship has been declined.\n\nBest Regards,\nYour Company`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Update the user's InternshipApproved status based on the action
        const isApproved = action === 'approve';
        await user.update({ InternshipApproved: isApproved });

        // Send success response
        res.json({ success: true, message: 'Email sent and status updated successfully' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
