export interface UserPayload extends JwtPayload {
  userId: mongoose.Types.ObjectId; // Or just string/number if not using MongoDB ObjectIds
  role: string;
  orgId: mongoose.Types.ObjectId;
  model: 'user' | 'staff';
  departmentId?: mongoose.Types.ObjectId;
}

declare global {
  namespace Express {
    export interface Request {
      /**
       * Holds the decoded user payload, typically added by authentication middleware (e.g., JWT verification).
       */
      user?: UserPayload | any; // Use your specific interface or 'any'
    }
  }
}
