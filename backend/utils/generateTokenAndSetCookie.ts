import jwt from 'jsonwebtoken';

import { Response } from 'express';
import { ObjectId } from 'mongoose';
export const generateTokenAndSetCookie = async (
  res: Response,
  userId: ObjectId,
  role: string,
  orgId: ObjectId,
  model: string,
  departmentId?: ObjectId
) => {
  const token = jwt.sign(
    { userId, role, orgId, model, departmentId },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '7d',
    }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  return token;
};
