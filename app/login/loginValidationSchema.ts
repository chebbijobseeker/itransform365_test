import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

export { loginValidationSchema, type LoginValidationSchema };
