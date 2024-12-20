import { z } from "zod";

const addCompanySchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  website: z.string().optional(),
  carrierPage: z.string().optional(),
  linkedIn: z.string().optional(),
  location: z.string().optional(),
});

export const companyValidation = { addCompanySchema };

export type TAddCompanyPayload = z.infer<typeof addCompanySchema>;
