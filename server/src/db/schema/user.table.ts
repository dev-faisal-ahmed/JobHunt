import { pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { companyTable } from "./company.table";
import { applicationTable } from "./application.table";
import { taskTable } from "./task.table";
import { interviewTable } from "./interview.table";

export enum PROVIDER {
  GOOGLE = "GOOGLE",
  CREDENTIALS = "CREDENTIALS",
}

export const providerEnum = pgEnum("provider", [PROVIDER.GOOGLE, PROVIDER.CREDENTIALS]);

export const userTable = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 60 }).notNull(),
    email: varchar({ length: 60 }).notNull(),
    password: varchar({ length: 60 }),
    imageUrl: text(),
    provider: providerEnum(),
    createdAt: timestamp().defaultNow(),
  },
  (table) => [{ emailIndex: uniqueIndex("email_idx").on(table.email) }]
);

export const userTableRelation = relations(userTable, ({ many }) => ({
  companies: many(companyTable),
  applications: many(applicationTable),
  tasks: many(taskTable),
  interviews: many(interviewTable),
}));
