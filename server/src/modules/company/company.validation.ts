import { z } from "zod";

const addCompanySchema = z.object({
  companyName: z
    .string({ required_error: "Company name is required" })
    .min(1, { message: "Company name is too little" }),
  carrierPageLink: z.string().optional(),
  note: z.string().optional(),
});

export const companyValidation = { addCompanySchema };

export type TAddCompanyPayload = z.infer<typeof addCompanySchema>;
