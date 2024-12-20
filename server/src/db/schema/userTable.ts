import { pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { companyTable } from "./companyTable";
import { connectionTable } from "./connectionTable";
import { applicationTable } from "./applicationTable";
import { taskTable } from "./taskTable";
import { interviewTable } from "./interviewTable";

export const providerEnum = pgEnum("provider", ["GOOGLE", "CREDENTIALS"]);

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
  connections: many(connectionTable),
  applications: many(applicationTable),
  tasks: many(taskTable),
  interviews: many(interviewTable),
}));
