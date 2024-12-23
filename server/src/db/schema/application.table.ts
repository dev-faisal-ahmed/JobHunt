import { pgEnum, pgTable, real, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { userTable } from "./user.table";
import { companyTable } from "./company.table";
import { taskTable } from "./task.table";
import { interviewTable } from "./interview.table";

export enum APPLICATION_STATUS {
  APPLIED = "APPLIED",
  GOT_TASK = "GOT_TASK",
  GO_INTERVIEW_CALL = "GO_INTERVIEW_CALL",
  HIRED = "HIRED",
  REJECTED = "REJECTED",
}

export enum JOB_TYPE {
  INTERNSHIP_ONSITE = "INTERNSHIP_ONSITE",
  INTERNSHIP_REMOTE = "INTERNSHIP_REMOTE",
  INTERNSHIP_HYBRID = "INTERNSHIP_HYBRID",
  FULL_TIME_ONSITE = "FULL_TIME_ONSITE",
  FULL_TIME_REMOTE = "FULL_TIME_REMOTE",
  FULL_TIME_HYBRID = "FULL_TIME_HYBRID",
  PART_TIME_ONSITE = "PART_TIME_ONSITE",
  PART_TIME_REMOTE = "PART_TIME_REMOTE",
  PART_TIME_HYBRID = "PART_TIME_HYBRID",
}

export const applicationStatusEnum = pgEnum("application-status", [
  APPLICATION_STATUS.APPLIED,
  APPLICATION_STATUS.GOT_TASK,
  APPLICATION_STATUS.GO_INTERVIEW_CALL,
  APPLICATION_STATUS.HIRED,
  APPLICATION_STATUS.REJECTED,
]);

export const jobTypeEnum = pgEnum("job-type", [
  JOB_TYPE.INTERNSHIP_ONSITE,
  JOB_TYPE.INTERNSHIP_REMOTE,
  JOB_TYPE.INTERNSHIP_HYBRID,
  JOB_TYPE.FULL_TIME_ONSITE,
  JOB_TYPE.FULL_TIME_REMOTE,
  JOB_TYPE.FULL_TIME_HYBRID,
  JOB_TYPE.PART_TIME_ONSITE,
  JOB_TYPE.PART_TIME_REMOTE,
  JOB_TYPE.PART_TIME_HYBRID,
]);

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
  status: applicationStatusEnum().default(APPLICATION_STATUS.APPLIED),
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
