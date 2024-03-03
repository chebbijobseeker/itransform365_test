import { z } from "zod";

const registerValidationSchema = z
  .object({
    fullName: z.string().min(1).max(255).optional(),
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
    confirmPassword: z.string().min(1).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterValidationSchema = z.infer<typeof registerValidationSchema>;

export { registerValidationSchema, type RegisterValidationSchema };
