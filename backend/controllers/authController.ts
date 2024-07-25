import { Request, Response } from 'express';
import { Admin } from '../models';
import bcrypt from 'bcrypt';

// Service functions
const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ Username: username, password: hashedPassword });
  return admin;
};

const login = async (username: string, password: string) => {
  const admin = await Admin.findOne({ where: { Username: username } });
  if (!admin) throw new Error('Admin not found');

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error('Invalid password');

  return admin;
};

// Controller functions
const registerAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await register(username, password);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const loginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await login(username, password);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export { registerAdmin, loginAdmin };
