import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AdminJwtPayload extends JwtPayload {
  roleId: number;
  adminId: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token provided');
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as AdminJwtPayload;
    console.log('Decoded token:', decoded);
    req.admin = decoded;
    next();
  } catch (ex) {
    console.log('Invalid token');
    res.status(400).send('Invalid token.');
  }
};
