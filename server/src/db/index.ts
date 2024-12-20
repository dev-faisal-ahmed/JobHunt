import { DATABASE_URL } from "../app/config";
import { drizzle } from "drizzle-orm/neon-http";
import { userTable } from "./schema/userTable";

export const db = drizzle({ connection: DATABASE_URL!, casing: "camelCase", schema: { userTable } });
