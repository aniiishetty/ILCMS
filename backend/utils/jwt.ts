import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = 'your_jwt_secret'; // Replace with your secret

export const generateToken = (adminId: number, roleId: number) => {
    return jwt.sign({ adminId, roleId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload & { roleId: number; adminId: number } => {
    return jwt.verify(token, secret) as JwtPayload & { roleId: number; adminId: number };
};
