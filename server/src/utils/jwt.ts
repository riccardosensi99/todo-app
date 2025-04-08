import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

export const signToken = (userId: number) => {
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload & { userId: number } => {
  return jwt.verify(token, secret) as JwtPayload & { userId: number };
};
