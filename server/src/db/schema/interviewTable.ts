import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { userTable } from "./userTable";
import { applicationTable } from "./applicationTable";
import { relations } from "drizzle-orm";

export const interviewStatusEnum = pgEnum("interview-status", ["PENDING", "SUBMITTED", "IGNORED"]);

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
  status: interviewStatusEnum().default("PENDING"),
  interviewDate: timestamp().notNull(),
  createdAt: timestamp().defaultNow(),
});

export const interviewTableRelations = relations(interviewTable, ({ one }) => ({
  user: one(userTable, { fields: [interviewTable.userId], references: [userTable.id] }),
  application: one(applicationTable, { fields: [interviewTable.applicationId], references: [applicationTable.id] }),
}));
