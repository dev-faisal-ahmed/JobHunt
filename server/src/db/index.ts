import { config } from "../app/config";
import { drizzle } from "drizzle-orm/neon-http";
import { userTable } from "./schema/userTable";

export const db = drizzle({ connection: config.DATABASE_URL!, casing: "camelCase", schema: { userTable } });
