import { db } from "../../db";
import { eq } from "drizzle-orm";
import { hashPassword } from "./auth.helper";
import { PROVIDERS, UserTable } from "../../db/schema/userTable";
import { AppError } from "../../helpers/appError";
import { TRegisterPayload } from "./auth.validation";

const register = async (payload: TRegisterPayload) => {
  const { name, email } = payload;
  // checking if user already exist or not
  const isUserExist = await db.query.user.findFirst({
    where: eq(UserTable.email, email),
    columns: { email: true },
  });

  if (isUserExist) throw new AppError("User already exist", 400);

  const userData: typeof UserTable.$inferInsert = { name, email, provider: PROVIDERS.CREDENTIALS };
  const password = await hashPassword(payload.password);
  userData["password"] = password;

  await db.insert(UserTable).values(userData);

  return "You have successfully registered";
};

export const authService = { register };
