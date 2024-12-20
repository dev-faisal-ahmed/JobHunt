import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { userTable } from "./userTable";
import { companyTable } from "./companyTable";

export const connectionStatusEnum = pgEnum("status", ["INVITED", "CONNECTED", "IN_CONTACT"]);

export const connectionTable = pgTable("connections", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id),
  companyId: uuid()
    .notNull()
    .references(() => companyTable.id),
  name: varchar({ length: 60 }),
  designation: varchar({ length: 60 }),
  linkedIn: text(),
  phone: varchar({ length: 16 }),
  email: varchar({ length: 60 }),
  status: connectionStatusEnum().default("INVITED"),
  createdAt: timestamp().defaultNow(),
});

export const connectionTableRelations = relations(connectionTable, ({ one }) => ({
  user: one(userTable, { fields: [connectionTable.userId], references: [userTable.id] }),
  company: one(companyTable, { fields: [connectionTable.companyId], references: [companyTable.id] }),
}));
