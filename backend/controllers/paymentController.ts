import { Request, Response } from 'express';
import { Payment, PaymentCreationAttributes } from '../models/payment';
import { User } from '../models/user';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';

export const createPayment = async (req: Request, res: Response) => {
  const { name, paymentMode, utrNo, userId } = req.body;

  // Retrieve file from request
  const referenceFile = (req.files as unknown as { [fieldname: string]: UploadedFile })?.referenceFile?.data || null;

  try {
      // Check if user exists
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Prepare payment data
      const paymentData: PaymentCreationAttributes = {
          name,
          paymentMode,
          utrNo,
          referenceFile: referenceFile || Buffer.from(''), // Default to empty buffer if no file is uploaded
          userId,
          status: 'pending', // Default status
      };

      // Create payment entry
      const payment = await Payment.create(paymentData);

      res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
      console.error('Error creating payment:', error); // Log error for debugging
      
      // Type guard to handle error
      if (error instanceof Error) {
          res.status(500).json({ message: 'Error creating payment', error: error.message });
      } else {
          res.status(500).json({ message: 'Unknown error occurred', error: 'Unknown error' });
      }
  }
};
export const getAllPayments = async (req: Request, res: Response) => {
    try {
      const payments = await Payment.findAll({ include: [{ model: User, as: 'user' }] });
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving payments', error });
    }
  };