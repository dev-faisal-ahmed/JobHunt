import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { userTable } from "./user.table";
import { applicationTable } from "./application.table";
import { relations } from "drizzle-orm";

export enum TASK_STATUS {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  IGNORED = "IGNORED",
}

export const taskStatusEnum = pgEnum("task-status", [TASK_STATUS.PENDING, TASK_STATUS.SUBMITTED, TASK_STATUS.IGNORED]);

export const taskTable = pgTable("tasks", {
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
  status: taskStatusEnum().default(TASK_STATUS.PENDING),
  deadline: timestamp().notNull(),
  createdAt: timestamp().defaultNow(),
});

export const taskTableRelations = relations(taskTable, ({ one }) => ({
  user: one(userTable, { fields: [taskTable.userId], references: [userTable.id] }),
  application: one(applicationTable, { fields: [taskTable.applicationId], references: [applicationTable.id] }),
}));
