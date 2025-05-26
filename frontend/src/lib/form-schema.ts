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
