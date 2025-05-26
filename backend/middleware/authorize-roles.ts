import { NextFunction, Request, Response } from 'express';

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: `Role (${userRole}) is not authorized to access this resource`,
      });
      return;
    }

    next();
  };
};
