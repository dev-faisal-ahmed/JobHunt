import bcrypt from "bcrypt";

import { config } from "../../app/config";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, config.SALT!);
};

export const comparePassword = async (givenPassword: string, passwordFormDb: string) => {
  return await bcrypt.compare(givenPassword, passwordFormDb);
};
