import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import { NextFunction, Request, Response } from 'express';
import { Company } from '../models/company.model';
import { models, ObjectId } from 'mongoose';
import { ROLE } from '../constants';
import { Staff } from '../models/staff.model';

export const register = async (req: Request, res: Response) => {
  const { email, firstName, middleName, lastName, orgName, password } =
    req.body;
  try {
    if (!email || !firstName || !lastName || !orgName || !password) {
      throw new Error('All fields are required');
    }

    const userAlreadyExists = await User.findOne({ email });
    const company = await Company.findOne({ orgName });

    if (userAlreadyExists) {
      throw new Error('An owner with same email already exists');
    }

    if (!company) {
      throw new Error('No organization with specified name exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const verificationToken = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      middleName,
      lastName,
      orgId: company.id,
      // verificationToken,
      // verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await user.save();

    // jwt
    const token = await generateTokenAndSetCookie(
      res,
      user.id,
      user.role,
      user.orgId as ObjectId,
      'user'
    );

    const userObj = user.toObject();

    // await sendVerificationEmail(userObj.email, verificationToken);

    res.status(200).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user._id,
        ...userObj,
        _id: undefined,
        password: undefined,
        __v: undefined,
        // verificationToken: undefined,
        // verificationTokenExpiresAt: undefined,
      },
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

export const register_admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, firstName, middleName, lastName, orgName, password } =
    req.body;
  try {
    if (!email || !firstName || !lastName || !orgName || !password) {
      throw new Error('All fields are required');
    }

    const userAlreadyExists = await User.findOne({ email });
    const company = await Company.findOne({ orgName });

    if (userAlreadyExists) {
      throw new Error('An owner or admin with same email already exists');
    }

    if (!company) {
      throw new Error('No organization with specified name exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const verificationToken = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      middleName,
      lastName,
      orgId: company.id,
      role: ROLE.Admin,
      // verificationToken,
      // verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await user.save();

    // jwt
    const token = await generateTokenAndSetCookie(
      res,
      user.id,
      user.role,
      user.orgId as ObjectId,
      'user'
    );

    const userObj = user.toObject();

    // await sendVerificationEmail(userObj.email, verificationToken);

    res.status(200).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user._id,
        ...userObj,
        _id: undefined,
        password: undefined,
        __v: undefined,
        // verificationToken: undefined,
        // verificationTokenExpiresAt: undefined,
      },
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    }
    return next(error);
  }
};

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) res.status(400).json({ message: 'Invalid credentials' });

      const token = await generateTokenAndSetCookie(
        res,
        user.id,
        user.role,
        user.orgId as ObjectId,
        'user'
      );

      const userObj = user.toObject();
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          id: user._id,
          ...userObj,
          _id: undefined,
          password: undefined,
          __v: undefined,
        },
        token,
      });
      return;
    }

    const staff = await Staff.findOne({ email });
    if (!staff) {
      res.status(400).json({ message: 'Invalid email' });
    } else {
      const isMatch = await bcrypt.compare(password, staff.password);
      if (!isMatch) res.status(400).json({ message: 'Invalid credentials' });

      const token = await generateTokenAndSetCookie(
        res,
        staff.id,
        staff.role,
        staff.orgId as ObjectId,
        'staff',
        staff.departmentId as ObjectId
      );

      const staffObj = staff.toObject();
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          id: staff._id,
          ...staffObj,
          _id: undefined,
          password: undefined,
          __v: undefined,
        },
        token,
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return next(error);
  }
};

export const forgot_password = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('No user found with the specified email');
    }

    // Generate reset token
    // const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    // const resetPasswordTokenExpiresAt = new Date(
    //   Date.now() + 1 * 60 * 60 * 1000
    // );

    // await sendResetPasswordToken(
    //   user.email,
    //   `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    // );

    // user.resetPasswordToken = resetPasswordToken;
    // user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

    // await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified, proceed to reset password',
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const reset_password = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    if (!newPassword || !confirmPassword) {
      throw new Error('All fields are required');
    }
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // user.resetPasswordToken = undefined;
    // user.resetPasswordTokenExpiresAt = undefined;
    user.password = hashedPassword;

    const userObj = user.toObject();
    await user.save();

    // await sendResetPasswordSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      user: {
        id: user._id,
        ...userObj,
        _id: undefined,
        password: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const verify_email = async (req: Request, res: Response) => {
  const { code } = req.body;
  try {
    if (!code) {
      throw new Error('Field is required');
    }

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Invalid or expired verification token');
    }

    // user.isVerified = true;
    // user.verificationToken = undefined;
    // user.verificationTokenExpiresAt = undefined;

    await user.save();

    // await sendWelcomeEmail(
    //   user.email,
    //   user.firstName + user.middleName + user.lastName
    // );

    const userObj = user.toObject();

    res.status(200).json({
      success: true,
      message: 'Email verification successful',
      user: {
        id: user._id,
        ...userObj,
        _id: undefined,
        password: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
