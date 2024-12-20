import bcrypt from "bcrypt";

import { SALT } from "../../app/config";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT!);
};

export const comparePassword = async (givenPassword: string, passwordFormDb: string) => {
  return await bcrypt.compare(givenPassword, passwordFormDb);
};
