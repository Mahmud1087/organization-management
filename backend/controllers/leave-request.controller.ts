import { NextFunction, Request, Response } from 'express';
import { CreateLeaveRequestBody } from '../types/global';
import { Staff } from '../models/staff.model';
import { LeaveRequest } from '../models/leave-request.model';
import { LEAVESTATUS } from '../constants';

export const create_request = async (
  req: Request<{}, {}, CreateLeaveRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { startDate, endDate, reason } = req.body;
  const { userId, orgId } = req.user;

  const leaveStartDate = new Date(startDate).toISOString();
  const leaveEndDate = new Date(endDate).toISOString();
  try {
    if (!startDate || !endDate || !reason) {
      res.status(401).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const staff = await Staff.findOne({ _id: userId }).select('-password -__v');

    if (!staff) {
      res.status(404).json({
        success: false,
        message: 'No staff found',
      });
    }

    const newRequest = new LeaveRequest({
      departmentId: staff?.departmentId,
      orgId,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reasonForLeave: reason,
      staffId: userId,
    });

    await newRequest.save();

    res.status(200).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: {
        id: newRequest._id,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const approve_reject_request = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const originalRequest = await LeaveRequest.findById(id);

    if (!originalRequest) {
      res
        .status(404)
        .json({ success: false, message: 'Leave request not found!' });
      return;
    }

    const previousStatus = originalRequest.status;

    const request = await LeaveRequest.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!request) {
      res
        .status(404)
        .json({ success: false, message: 'Leave request not found!' });
      return;
    }

    request.reviewedBy = userId;

    const staff = await Staff.findOne({ _id: request.staffId });

    if (staff) {
      const currentStatus = request.status;

      // Case 1: Newly approved (was not approved before)
      if (
        currentStatus === LEAVESTATUS.Approved &&
        previousStatus !== LEAVESTATUS.Approved
      ) {
        staff.leaveBalance -= 1;
        staff.totalLeavesTaken += 1;
        request.reasonForRejection = '';
        await staff.save();
      }
      // Case 2: Previously approved but now rejected
      else if (
        previousStatus === LEAVESTATUS.Approved &&
        currentStatus === LEAVESTATUS.Rejected
      ) {
        staff.leaveBalance += 1;
        staff.totalLeavesTaken -= 1;
        request.reasonForRejection = req.body.reason || 'None';
        await staff.save();
      }
    }

    await request.save();

    res.status(200).json({
      success: true,
      message: `Leave request ${
        request.status === LEAVESTATUS.Approved
          ? 'approved'
          : request.status === LEAVESTATUS.Rejected
            ? 'rejected'
            : ''
      }`,
      data: {
        id: request._id,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const delete_request = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error('leave request id is required');
    }

    const request = await LeaveRequest.findOne({ _id: id });

    if (!request) {
      res.status(404).json({
        success: false,
        message: 'Request with provided id does not exist',
      });
    }

    await request?.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Request deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const get_all_request = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allRequest = await LeaveRequest.find().select('-__v');
    res.status(200).json({
      success: true,
      message: 'Fetched all requests in the database',
      data: allRequest,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_request_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const request = await LeaveRequest.findOne({ _id: id }).select('-__v');
    res.status(200).json({
      success: true,
      message: 'Request fetched successfully',
      data: request,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_request_by_orgId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orgId } = req.params;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalRequest = await LeaveRequest.countDocuments({ orgId });

    const request = await LeaveRequest.find({ orgId })
      .select('-__v')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalRequest / limit);

    res.status(200).json({
      success: true,
      message: 'Requests fetched successfully',
      data: {
        pagination: {
          total: totalRequest,
          limit: limit,
          page: page,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_previous: page > 1,
        },
        result: request,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const get_request_by_dept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { departmentId } = req.params;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  try {
    const totalRequest = await LeaveRequest.countDocuments({ departmentId });

    const request = await LeaveRequest.find({ departmentId })
      .select('-__v')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalRequest / limit);

    res.status(200).json({
      success: true,
      message: 'Leave Requests fetched successfully',
      data: {
        pagination: {
          total: totalRequest,
          limit: limit,
          page: page,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_previous: page > 1,
        },
        result: request,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const get_request_by_staff_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { staffId } = req.params;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  try {
    const totalRequest = await LeaveRequest.countDocuments({ staffId });

    const request = await LeaveRequest.find({ staffId })
      .select('-__v')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalRequest / limit);

    res.status(200).json({
      success: true,
      message: 'Leave Requests fetched successfully',
      data: {
        pagination: {
          total: totalRequest,
          limit: limit,
          page: page,
          total_pages: totalPages,
          has_next: page < totalPages,
          has_previous: page > 1,
        },
        result: request,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
