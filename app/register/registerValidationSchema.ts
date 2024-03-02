import { z } from "zod";

const registerValidationSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterValidationSchema = z.infer<typeof registerValidationSchema>;

export { registerValidationSchema, type RegisterValidationSchema };
