import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { userTable } from "./user.table";
import { applicationTable } from "./application.table";
import { relations } from "drizzle-orm";

export enum INTERVIEW_STATUS {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  IGNORED = "IGNORED",
}

export const interviewStatusEnum = pgEnum("interview-status", [
  INTERVIEW_STATUS.PENDING,
  INTERVIEW_STATUS.SUBMITTED,
  INTERVIEW_STATUS.IGNORED,
]);

export const interviewTable = pgTable("interviews", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id),
  applicationId: uuid()
    .notNull()
    .references(() => applicationTable.id),
  level: integer().notNull(),
  description: text(),
  note: text(),
  status: interviewStatusEnum().default(INTERVIEW_STATUS.PENDING),
  interviewDate: timestamp().notNull(),
  createdAt: timestamp().defaultNow(),
});

export const interviewTableRelations = relations(interviewTable, ({ one }) => ({
  user: one(userTable, { fields: [interviewTable.userId], references: [userTable.id] }),
  application: one(applicationTable, { fields: [interviewTable.applicationId], references: [applicationTable.id] }),
}));
