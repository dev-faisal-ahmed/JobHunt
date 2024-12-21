import { z } from "zod";

const addCompanySchema = z.object({
  name: z.string({ required_error: "CompanyName is required" }).min(1, { message: "CompanyName is required" }),
  email: z.string().email({ message: "Invalid email" }).optional(),
  website: z.string().url({ message: "Invalid url" }).optional(),
  carrierPage: z.string().url({ message: "Invalid url" }).optional(),
  linkedIn: z.string().url({ message: "Invalid url" }).optional(),
  location: z.string().min(1, { message: "Invalid location" }).optional(),
});

const updateCompanySchema = z.object({
  companyId: z.string().uuid({ message: "Invalid companyId" }),
  name: z
    .string({ required_error: "CompanyName is required" })
    .min(1, { message: "CompanyName is required" })
    .optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  website: z.string().url({ message: "Invalid website url" }).optional(),
  carrierPage: z.string().url({ message: "Invalid carrier page url" }).optional(),
  linkedIn: z.string().url({ message: "Invalid linkedIn url" }).optional(),
  location: z.string().min(1, { message: "Invalid location" }).optional(),
});

export const companyValidation = { addCompanySchema, updateCompanySchema };

export type TAddCompanyPayload = z.infer<typeof addCompanySchema>;
export type TUpdateCompanyPayload = z.infer<typeof updateCompanySchema>;
