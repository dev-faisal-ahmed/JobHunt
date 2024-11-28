import { db } from "../../db";
import { hashPassword } from "./auth.helper";
import { PROVIDERS, UserTable } from "../../db/schema/userTable";
import { TRegisterPayload } from "./auth.validation";

const register = async (payload: TRegisterPayload) => {
  const { name, email, provider, imageUrl } = payload;
  const userData: typeof UserTable.$inferInsert = { name, email, provider };

  if (imageUrl) userData["imageUrl"] = imageUrl;
  if (provider === PROVIDERS.CREDENTIALS) {
    const password = await hashPassword(payload.password);
    console.log(password.length);
    userData["password"] = password;
  }

  await db.insert(UserTable).values(userData);
  return "You have successfully registered";
};

export const authService = { register };
