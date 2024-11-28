import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const SALT = Number(process.env.SALT);

export const config = { DATABASE_URL, NODE_ENV, PORT, SALT };
