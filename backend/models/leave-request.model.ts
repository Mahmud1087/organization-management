import { model, Schema, Types } from 'mongoose';
import { LEAVESTATUS } from '../constants';

const leaveRequestModel = new Schema({
  staffId: {
    type: Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  orgId: {
    type: Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  departmentId: {
    type: Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  reviewedBy: {
    type: Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: [LEAVESTATUS.Approved, LEAVESTATUS.Pending, LEAVESTATUS.Rejected],
    default: LEAVESTATUS.Pending,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  reasonForLeave: String,
  reasonForRejection: String,
});

export const LeaveRequest = model('LeaveRequest', leaveRequestModel);
