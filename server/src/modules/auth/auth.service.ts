import { db } from "../../db";
import { UserTable } from "../../db/schema/users";

const register = async () => {
  // inserting new user
  const [userResponse] = await db
    .insert(UserTable)
    .values({ name: "Faisal Ahmed", email: "ost.faisal.ahmed@gmail.com", password: "1345" })
    .returning({
      id: UserTable.id,
      name: UserTable.name,
      password: UserTable.password,
    });

  return userResponse;
};

export const authService = { register };
