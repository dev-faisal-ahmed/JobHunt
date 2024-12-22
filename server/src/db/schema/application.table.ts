import { pgEnum, pgTable, real, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { userTable } from "./user.table";
import { companyTable } from "./company.table";
import { taskTable } from "./task.table";
import { interviewTable } from "./interview.table";

export const APPLICATION_STATUS = ["APPLIED", "GOT_TASK", "GO_INTERVIEW_CALL", "HIRED", "REJECTED"] as const;
export const JOB_TYPE = [
  "INTERNSHIP_ONSITE",
  "INTERNSHIP_REMOTE",
  "INTERNSHIP_HYBRID",
  "FULL_TIME_ONSITE",
  "FULL_TIME_REMOTE",
  "FULL_TIME_HYBRID",
  "PART_TIME_ONSITE",
  "PART_TIME_REMOTE",
  "PART_TIME_HYBRID",
] as const;

export const applicationStatusEnum = pgEnum("application-status", APPLICATION_STATUS);
export const jobTypeEnum = pgEnum("job-type", JOB_TYPE);

export const applicationTable = pgTable("applications", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id),
  companyId: uuid()
    .notNull()
    .references(() => companyTable.id),
  designation: varchar({ length: 40 }),
  jobPostLink: text(),
  description: text(),
  type: jobTypeEnum(),
  status: applicationStatusEnum().default("APPLIED"),
  salary: real(),
  expectedSalary: real(),
  skills: text().array(),
  location: text(),
  createdAt: timestamp().defaultNow(),
});

export const applicationRelations = relations(applicationTable, ({ one, many }) => ({
  userId: one(userTable, { fields: [applicationTable.userId], references: [userTable.id] }),
  company: one(companyTable, { fields: [applicationTable.companyId], references: [companyTable.id] }),
  tasks: many(taskTable),
  interviews: many(interviewTable),
}));
