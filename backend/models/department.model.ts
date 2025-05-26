import { Schema, Types, model } from 'mongoose';

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orgId: {
      type: Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    managerId: {
      type: Types.ObjectId,
      ref: 'Employee',
    },
    noOfEmployee: {
      type: Number,
      default: 0,
    },
    totalStaff: {
      type: Number,
      default: 0,
    },
    noOfManagers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Department = model('Department', departmentSchema);
