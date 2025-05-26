import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    officeEmail: {
      type: String,
      required: true,
      unique: true,
    },
    officePhone: {
      type: String,
      required: true,
      unique: true,
    },
    orgName: {
      type: String,
      required: true,
      unique: true,
    },
    officeAddress: {
      type: String,
      required: true,
      unique: true,
    },
    sector: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model('Company', companySchema);
