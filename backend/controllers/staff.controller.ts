import { NextFunction, Request, Response } from 'express';
import { Department } from '../models/department.model';
import bcrypt from 'bcryptjs';
import { ROLE } from '../constants';
import { CreateStaffRequestBody, LoginStaffRequestBody } from '../types/global';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import mongoose, { ObjectId } from 'mongoose';
import crypto from 'crypto';
import { Staff } from '../models/staff.model';

export const create_staff = async (
  req: Request<{}, {}, CreateStaffRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role = ROLE.Employee,
    address,
    departmentName,
  } = req.body;

  const { userId, role: adminRole, orgId } = req.user;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !departmentName
    ) {
      throw new Error('All fields are required');
    }

    if (role !== ROLE.Manager && role !== ROLE.Employee) {
      throw new Error('Only employee or manager roles are accepted');
    }

    const staffAlreadyExists = await Staff.findOne({
      email,
    });

    if (adminRole !== ROLE.Admin && adminRole !== 'owner') {
      throw new Error('Not authorized to perform this operation');
    }

    const department = await Department.findOne({ name: departmentName });

    if (staffAlreadyExists) {
      throw new Error('Staff with specified email already exist');
    }

    if (!department) {
      throw new Error('Department with specified name does not exist');
    }

    const password = crypto.randomBytes(4).toString('hex');

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = new Staff({
      firstName,
      lastName,
      phoneNumber,
      role,
      address,
      password: hashedPassword,
      email,
      departmentId: department._id,
      createdBy: userId,
      orgId,
    });
    const stafObj = staff.toObject();

    await staff.save();

    department.totalStaff += 1;
    if (role === ROLE.Employee) {
      department.noOfEmployee += 1;
    } else if (ROLE.Manager) {
      department.noOfManagers += 1;
    }
    await department.save();

    res.status(200).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: staff._id,
        ...stafObj,
        password,
        __v: undefined,
        _id: undefined,
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
    return next(error);
  }
};

export const login_staff = async (
  req: Request<{}, {}, LoginStaffRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('All fields are required');
    }

    const staff = await Staff.findOne({ email });

    if (!staff) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = await generateTokenAndSetCookie(
      res,
      staff.id,
      staff.role,
      staff.orgId as ObjectId,
      'staff',
      staff.departmentId as ObjectId
    );

    staff.lastLogin = new Date();
    await staff.save();

    const staffObj = staff.toObject();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: staff._id,
        ...staffObj,
        token,
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
    return next(error);
  }
};

export const update_staff = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  try {
    if (email) {
      const staffExists = await Staff.findOne({ email });
      if (staffExists) {
        res.status(401).json({
          success: false,
          message: 'Staff with the specified email already exist',
        });
      }
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Only update fields included in the request
      { new: true, runValidators: true }
    );

    if (!updatedStaff) {
      res.status(404).json({ success: false, message: 'Staff not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Staff details updated successfully',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const delete_staff = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error('staff id is required');
    }

    const staff = await Staff.findOne({ _id: id });

    if (!staff) {
      res.status(404).json({
        success: false,
        message: 'Staff with provided id does not exist',
      });
    }

    const department = await Department.findOne({
      _id: staff?.departmentId,
    });
    await staff?.deleteOne();

    if (department) {
      department.totalStaff -= 1;
      if (staff?.role === ROLE.Employee) {
        department.noOfEmployee -= 1;
      } else if (staff?.role === ROLE.Manager) {
        department.noOfManagers -= 1;
      }
    }

    await department?.save();

    res.status(200).json({
      success: true,
      message: 'Staff deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const get_all_staff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStaff = await Staff.find().select('-password -__v');
    res.status(200).json({
      success: true,
      message: 'Fetched all staff in the database',
      data: allStaff,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_staff_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findOne({ _id: id }).select('-password -__v');
    res.status(200).json({
      success: true,
      message: 'Staff fetched successfully',
      data: staff,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_staff_by_orgId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orgId } = req.params;

  // Get pagination parameters from query
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  // Calculate skip value for MongoDB
  const skip = (page - 1) * limit;

  try {
    // Get total count of staff for this organization
    const totalStaff = await Staff.countDocuments({ orgId });

    // Get paginated staff data
    const staff = await Staff.find({ orgId })
      .select('-password -__v')
      .skip(skip)
      .limit(limit);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalStaff / limit);

    res.status(200).json({
      success: true,
      message: 'Staffs fetched successfully',
      data: {
        pagination: {
          total: totalStaff,
          limit: limit,
          page: page,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_previous: page > 1,
        },
        result: staff,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_staff_by_dept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { departmentId } = req.params;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  try {
    const totalStaff = await Staff.countDocuments({ departmentId });

    const staff = await Staff.find({ departmentId })
      .select('-password -__v')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalStaff / limit);

    res.status(200).json({
      success: true,
      message: 'Staffs fetched successfully',
      data: {
        pagination: {
          total: totalStaff,
          limit: limit,
          page: page,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_previous: page > 1,
        },
        result: staff,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
