import { z } from "zod";

const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, { message: "Too short name" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }).min(4, { message: "Minimum password length is 4" }),
});

export type TRegisterPayload = z.infer<typeof registerSchema>;

export const authValidation = { registerSchema };
