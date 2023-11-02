import * as z from 'zod';

export const authSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required' })
    .min(3, { message: 'Your name should not be that short!' })
    .max(255),
  email: z.string().email(),
  studentId: z
    .string({ required_error: 'Student ID is required' })
    .min(7, { message: 'Value should be exactly 7 characters' })
    .max(7, { message: 'Value should be exactly 7 characters' })
    .refine((val) => !isNaN(val as unknown as number), {
      message: 'Value should be a number',
    }),
  year: z.string().min(2).max(10),
  password: z
    .string()
    .min(8)
    .max(255)
    .regex(/[A-Z]/, 'Password must have at least one uppercase letter')
    .regex(/[a-z]/, 'Password must have at least one lowercase letter')
    .regex(/\d/, 'Password must have at least one number')
    .regex(/[@$!%*?&]/, 'Password must have at least one special character'),
  confirmPassword: z.string().optional(),
});

export type AuthForm = z.infer<typeof authSchema>;
