import { relations } from "drizzle-orm";
import { pgEnum, pgTable, real, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./userTable";
import { companyTable } from "./companyTable";

export const applicationStatusEnum = pgEnum("status", [
  "APPLIED",
  "GOT_TASK",
  "GO_INTERVIEW_CALL",
  "HIRED",
  "REJECTED",
]);

export const jobTypeEnum = pgEnum("job-type", [
  "INTERNSHIP_ONSITE",
  "INTERNSHIP_REMOTE",
  "INTERNSHIP_HYBRID",
  "FULL_TIME_ONSITE",
  "FULL_TIME_REMOTE",
  "FULL_TIME_HYBRID",
  "PART_TIME_ONSITE",
  "PART_TIME_REMOTE",
  "PART_TIME_HYBRID",
]);

export const applicationTable = pgTable("applications", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid().notNull(),
  companyId: uuid().notNull(),
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

export const applicationRelations = relations(applicationTable, ({ one }) => ({
  userId: one(userTable, { fields: [applicationTable.userId], references: [userTable.id] }),
  company: one(companyTable, { fields: [applicationTable.companyId], references: [companyTable.id] }),
}));
