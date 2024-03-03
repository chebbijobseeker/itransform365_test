import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(1).max(255),
});

type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

export { loginValidationSchema, type LoginValidationSchema };
