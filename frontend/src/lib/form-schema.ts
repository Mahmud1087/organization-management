import { ROLES } from '@/config/constants';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .email({
      message: 'Invalid email address.',
    }),
  password: z.string().min(1, {
    message: 'Password cannot be empty.',
  }),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
  //   message:
  //     'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  // }),
});

export const addStaffFormSchema = z.object({
  firstName: z
    .string({
      required_error: 'Firstname is required.',
    })
    .min(2, {
      message: 'Firstname must be at least 2 characters.',
    }),
  lastName: z
    .string({
      required_error: 'Lastname is required.',
    })
    .min(2, {
      message: 'Lastname must be at least 2 characters.',
    }),
  phoneNumber: z
    .string({
      required_error: ' Phone number is required.',
    })
    .refine((val) => {
      const cleaned = val.replace(/\s+/g, '');
      return /^0\d{10}$/.test(cleaned) || /^(\+234|234)?0\d{10}$/.test(cleaned);
    }),
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({
      message: 'Invalid email address.',
    }),
  role: z.enum([ROLES.Manager, ROLES.Employee], {
    message: 'Role must be one of the following: manager and employee.',
  }),
  address: z
    .string({
      required_error: 'Address is required.',
    })
    .min(5, {
      message: 'Address must be at least 5 characters.',
    }),
  departmentName: z
    .string({
      required_error: 'Department is required.',
    })
    .min(2, {
      message: 'Department must be at least 2 characters.',
    }),
});

export const departmentFormSchema = z.object({
  name: z
    .string({
      required_error: 'Department name is required.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),
});

export const rejectLeaveFormSchema = z.object({
  reason: z
    .string({
      required_error: 'Field cannot be empty.',
    })
    .min(8, {
      message: 'Reason must be at least 8 characters.',
    }),
});

export const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Firstname must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Lastname must be at least 2 characters.',
  }),
  phoneNumber: z.string().refine((val) => {
    const cleaned = val.replace(/\s+/g, '');
    return /^0\d{10}$/.test(cleaned) || /^(\+234|234)?0\d{10}$/.test(cleaned);
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),

  address: z.string(),
});

export const securityFormSchema = z.object({
  oldPassword: z.string().min(1, {
    message: 'Password cannot be empty.',
  }),
  newPassword: z.string().min(1, {
    message: 'Password cannot be empty.',
  }),
  confirmPassword: z.string().min(1, {
    message: 'Password cannot be empty.',
  }),
});

export const orgSettingsFormSchema = z.object({
  orgName: z.string(),
  sector: z.string(),
  phoneNumber: z.string().refine((val) => {
    const cleaned = val.replace(/\s+/g, '');
    return /^0\d{10}$/.test(cleaned) || /^(\+234|234)?0\d{10}$/.test(cleaned);
  }),
  officeEmail: z.string().email({
    message: 'Invalid email address.',
  }),

  officeAddress: z.string(),
});
