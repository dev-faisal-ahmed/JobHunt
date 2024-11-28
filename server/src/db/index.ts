import { drizzle } from "drizzle-orm/neon-http";
import { config } from "../app/config";

export const db = drizzle({ connection: config.DATABASE_URL, casing: "camelCase" });
