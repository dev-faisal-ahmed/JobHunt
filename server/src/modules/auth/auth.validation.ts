import { z } from "zod";

const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, { message: "Too short name" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }).min(4, { message: "Minimum password length is 4" }),
});

const loginWithCredentialsSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }),
});

const changePasswordSchema = z.object({
  oldPassword: z
    .string({ required_error: "Old Password is required" })
    .min(1, { message: "Password can not be empty string" }),
  newPassword: z
    .string({ required_error: "New Password is required" })
    .min(4, { message: "Minimum password length is 4" }),
});

export type TRegisterPayload = z.infer<typeof registerSchema>;
export type TLoginWithCredentialsPayload = z.infer<typeof loginWithCredentialsSchema>;
export type TChangePasswordPayload = z.infer<typeof changePasswordSchema>;

export const authValidation = { registerSchema, loginWithCredentialsSchema, changePasswordSchema };
