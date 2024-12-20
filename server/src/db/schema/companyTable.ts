import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { userTable } from "./userTable";
import { relations } from "drizzle-orm";
import { connectionTable } from "./connectionTable";
import { applicationTable } from "./applicationTable";

export const companyTable = pgTable("companies", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id),
  name: varchar({ length: 80 }).notNull(),
  email: varchar({ length: 60 }),
  website: text(),
  carrierPage: text(),
  linkedIn: text(),
  location: varchar({ length: 80 }),
  createdAt: timestamp().defaultNow(),
});

export const CompanyTableRelations = relations(companyTable, ({ one, many }) => ({
  user: one(userTable, { fields: [companyTable.userId], references: [userTable.id] }),
  connections: many(connectionTable),
  applications: many(applicationTable),
}));
