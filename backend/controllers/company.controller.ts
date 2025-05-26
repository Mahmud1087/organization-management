import { NextFunction, Request, Response } from 'express';
import { Company } from '../models/company.model';

export const register_company = async (req: Request, res: Response) => {
  const { officeEmail, officePhone, officeAddress, orgName, sector } = req.body;
  try {
    if (!officePhone || !officeEmail || !officeAddress || !orgName || !sector) {
      throw new Error('All fields are required');
    }

    const companyExists = await Company.findOne({
      officeEmail,
      officePhone,
      officeAddress,
      orgName,
    });
    if (companyExists) {
      throw new Error('Company with specified details already exists');
    }

    const company = new Company({
      officeAddress,
      officeEmail,
      officePhone,
      orgName,
      sector,
    });

    await company.save();

    const companyObj = company.toObject();

    res.status(200).json({
      success: true,
      message: 'Company created successfully',
      company: {
        id: company._id,
        ...companyObj,
        _id: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

export const update_company = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { officeEmail } = req.body;

  try {
    if (officeEmail) {
      const companyExists = await Company.findOne({ officeEmail });
      if (companyExists) {
        res.status(401).json({
          success: false,
          message: 'Company with the specified office email already exist',
        });
      }
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      res.status(404).json({ success: false, message: 'Company not found!' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Company details updated successfully',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const delete_company = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error('Company id is required');
    }

    const company = await Company.findOne({ _id: id });

    if (!company) {
      res.status(404).json({
        success: false,
        message: 'Company with provided id does not exist',
      });
    }

    await company?.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const get_all_company = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCompany = await Company.find().select('-__v');
    res.status(200).json({
      success: true,
      message: 'Fetched all company in the database',
      data: allCompany,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_company_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const company = await Company.findOne({ _id: id }).select('-__v');
    res.status(200).json({
      success: true,
      message: 'Company fetched successfully',
      data: company,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
