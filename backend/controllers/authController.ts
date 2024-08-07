import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Admin from '../models/Admin';
import { generateToken } from '../utils/jwt';


export const createCredentials = async (req: Request, res: Response) => {
  const { username, password, roleId } = req.body;

  // Check if all required fields are provided
  if (!username || !password || roleId === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin record with the hashed password
      const newAdmin = await Admin.create({
          username,
          password: hashedPassword, // Save the hashed password
          roleId,
      });

      console.log(`New credentials created for username: ${username}`);
      return res.status(201).json({ message: 'Credentials created successfully', admin: newAdmin });
  } catch (err) {
      console.error('Error creating credentials:', err);
      return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log('Password input:', password);

  try {
      // Find the admin record with the provided username
      const admin = await Admin.findOne({ where: { username } });
      console.log('Admin record found:', admin);

      if (!admin) {
          console.log('Admin record not found');
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
          console.log('Invalid password');
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      // If the password is valid, return a success response
      const token = generateToken(admin.id, admin.roleId);
        res.send({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};