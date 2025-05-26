import { NextFunction, Request, Response } from 'express';
import { Department } from '../models/department.model';

export const create_departement = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { userId, orgId } = req.user;

  try {
    if (!name) {
      throw new Error('All fields are required');
    }

    const deptAlreadyExists = await Department.findOne({ name });
    // const admin = await User.findOne({ email: adminEmail });

    if (deptAlreadyExists) {
      throw new Error('Department with specified name already exists');
    }

    const department = new Department({
      name,
      createdBy: userId,
      orgId,
    });

    await department.save();

    const deptObj = department.toObject();

    res.status(200).json({
      success: true,
      message: 'Department created successfully',
      data: {
        id: department._id,
        ...deptObj,
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
  }
};

export const update_department = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (name) {
      const departmentExists = await Department.findOne({ name });
      if (departmentExists) {
        res.status(401).json({
          success: false,
          message: 'Department with the specified name already exist',
        });
      }
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      res
        .status(404)
        .json({ success: false, message: 'Department not found!' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Department details updated successfully',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const delete_department = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error('Department id is required');
    }

    const department = await Department.findOne({ _id: id });

    if (!department) {
      res.status(404).json({
        success: false,
        message: 'Department with provided id does not exist',
      });
    }

    await department?.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const get_all_department = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allDepartment = await Department.find().select('-__v');
    res.status(200).json({
      success: true,
      message: 'Fetched all department in the database',
      data: allDepartment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_department_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const department = await Department.findOne({ _id: id }).select('-__v');
    res.status(200).json({
      success: true,
      message: 'Department fetched successfully',
      data: department,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_department_by_orgId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orgId } = req.params;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  try {
    const totalDepartment = await Department.countDocuments({ orgId });

    const departments = await Department.find({ orgId })
      .select('-password -__v')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalDepartment / limit);

    res.status(200).json({
      success: true,
      message: 'Departments fetched successfully',
      data: {
        pagination: {
          total: totalDepartment,
          limit: limit,
          page: page,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_previous: page > 1,
        },
        result: departments,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
