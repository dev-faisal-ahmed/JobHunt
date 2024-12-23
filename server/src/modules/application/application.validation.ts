import { z } from "zod";

const createApplicationSchema = z.object({
  companyId: z.string({ required_error: "CompanyId is required" }).uuid({ message: "Invalid companyId" }),
  designation: z
    .string()
    .min(1, { message: "Designation is required" })
    .max(40, { message: "Designation should be less than 40 characters" })
    .optional(),
  jobPostLink: z.string().min(1, { message: "JobPostLink can not be empty" }).optional(),
  description: z.string().min(1, { message: "Description is required" }).optional(),
  type: z
    .enum(
      [
        "INTERNSHIP_ONSITE",
        "INTERNSHIP_REMOTE",
        "INTERNSHIP_HYBRID",
        "FULL_TIME_ONSITE",
        "FULL_TIME_REMOTE",
        "FULL_TIME_HYBRID",
        "PART_TIME_ONSITE",
        "PART_TIME_REMOTE",
        "PART_TIME_HYBRID",
      ],
      { message: "Invalid job type" }
    )
    .optional(),
});

export const applicationValidation = { createApplicationSchema };

export type TCreateApplicationPayload = z.infer<typeof createApplicationSchema>;
