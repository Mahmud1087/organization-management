import { Schema, Types, model } from 'mongoose';

const staffSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    departmentId: {
      type: Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    orgId: {
      type: Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    // TODO: Add an enum of positions allowed
    // position: {
    //   type: String,
    // },
    role: {
      type: String,
      enum: ['employee', 'manager'],
      required: true,
      default: 'employee',
    },
    // startDate: {
    //   type: Date,
    //   default: Date.now,
    // },
    address: {
      type: String,
    },
    profilePictureUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    // managesDepartment: {
    //   type: String,
    // },
    totalLeavesTaken: {
      type: Number,
      default: 0,
    },
    leaveBalance: {
      type: Number,
      default: 20,
    },
    lastLogin: {
      type: Date,
      // default: Date.now,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Staff = model('Staff', staffSchema);
