import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 30 }).notNull(),
  email: varchar({ length: 30 }).unique().notNull(),
  password: varchar({ length: 12 }).notNull(),
  createdAt: timestamp().defaultNow(),
});
