import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export enum PROVIDERS {
  GOOGLE = "GOOGLE",
  CREDENTIALS = "CREDENTIALS",
}

export const USERS = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 30 }).notNull(),
  email: varchar({ length: 60 }).unique().notNull(),
  password: varchar({ length: 60 }),
  provider: varchar({ length: 12, enum: [PROVIDERS.GOOGLE, PROVIDERS.CREDENTIALS] }).notNull(),
  imageUrl: text(),
  createdAt: timestamp().defaultNow(),
});
