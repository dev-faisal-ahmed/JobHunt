import { z } from "zod";

// schemas
const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, { message: "Too short name" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }).min(4, { message: "Minimum password length is 4" }),
});

const loginWithCredentialsSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }),
});

const loginWithGoogleSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, { message: "Too short name" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  imageUrl: z.string().min(1, { message: "Image url can not be an empty string" }).optional(),
});

const changePasswordSchema = z.object({
  oldPassword: z
    .string({ required_error: "Old Password is required" })
    .min(1, { message: "Password can not be empty string" }),
  newPassword: z
    .string({ required_error: "New Password is required" })
    .min(4, { message: "Minimum password length is 4" }),
});

export const authValidation = {
  registerSchema,
  loginWithCredentialsSchema,
  loginWithGoogleSchema,
  changePasswordSchema,
};

// types
export type TRegisterPayload = z.infer<typeof registerSchema>;
export type TLoginWithCredentialsPayload = z.infer<typeof loginWithCredentialsSchema>;
export type TChangePasswordPayload = z.infer<typeof changePasswordSchema>;
export type TLoginWithGooglePayload = z.infer<typeof loginWithGoogleSchema>;
