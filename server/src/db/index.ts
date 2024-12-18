import { config } from "../app/config";
import { drizzle } from "drizzle-orm/neon-http";
import { COMPANIES, USERS } from "./schema";

export const db = drizzle({ connection: config.DATABASE_URL!, casing: "camelCase", schema: { USERS, COMPANIES } });
