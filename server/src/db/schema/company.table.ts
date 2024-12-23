import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { userTable } from "./user.table";
import { relations } from "drizzle-orm";
import { applicationTable } from "./application.table";

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
  applications: many(applicationTable),
}));
