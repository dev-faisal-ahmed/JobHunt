import { z } from "zod";
import { enumGenerator } from "../../helpers/common";
import { JOB_TYPE } from "../../db/schema";

const createApplicationSchema = z.object({
  companyId: z.string({ required_error: "CompanyId is required" }).uuid({ message: "Invalid companyId" }),
  designation: z
    .string()
    .min(1, { message: "Designation is required" })
    .max(40, { message: "Designation should be less than 40 characters" }),

  jobPostLink: z.string().min(1, { message: "JobPostLink can not be empty" }).optional(),
  description: z.string().min(1, { message: "Description is required" }).optional(),
  type: enumGenerator(Object.values(JOB_TYPE), "Invalid job type").optional(),
  salary: z.number().positive({ message: "Salary should be positive" }).optional(),
  expectedSalary: z.number().positive({ message: "Expected salary should be positive" }).optional(),
  skills: z
    .array(z.string({ message: "String Expected in skills" }).min(1, { message: "Empty string is not allowed" }))
    .optional(),
  location: z.string().min(1, { message: "Invalid location" }).optional(),
});

export const applicationValidation = { createApplicationSchema };

export type TCreateApplicationPayload = z.infer<typeof createApplicationSchema> & { type: JOB_TYPE };
