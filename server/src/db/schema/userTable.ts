import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { companyTable } from "./companyTable";

export const ProviderEnum = pgEnum("provider", ["GOOGLE", "CREDENTIALS"]);

export const userTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 60 }).notNull(),
    email: varchar({ length: 60 }).notNull(),
    password: varchar({ length: 60 }),
    imageUrl: text(),
    provider: ProviderEnum(),
    createdAt: timestamp().defaultNow(),
  },
  (table) => [{ emailIndex: uniqueIndex("email_idx").on(table.email) }]
);

export const userTableRelation = relations(userTable, ({ many }) => {
  return {
    companies: many(companyTable),
  };
});
