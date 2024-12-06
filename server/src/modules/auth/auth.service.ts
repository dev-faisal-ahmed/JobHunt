import {
  TChangePasswordPayload,
  TLoginWithCredentialsPayload,
  TLoginWithGooglePayload,
  TRegisterPayload,
} from "./auth.validation";

import { db } from "../../db";
import { eq } from "drizzle-orm";
import { AppError } from "../../helpers/appError";
import { decodeRefreshToken, generateAccessToken, generateRefreshToken } from "../../helpers/common";
import { comparePassword, hashPassword } from "./auth.helper";
import { PROVIDERS, USERS } from "../../db/schema";

const register = async (payload: TRegisterPayload) => {
  const { name, email } = payload;
  // checking if user already exist or not
  const isUserExist = await db.query.USERS.findFirst({
    where: eq(USERS.email, email),
    columns: { email: true },
  });

  if (isUserExist) throw new AppError("User already exist", 400);

  const password = await hashPassword(payload.password);
  await db.insert(USERS).values({ name, email, password, provider: PROVIDERS.CREDENTIALS });

  return "You have successfully registered";
};

const loginWithCredentials = async (payload: TLoginWithCredentialsPayload) => {
  const { email, password } = payload;
  const isUserExist = await db.query.USERS.findFirst({
    where: eq(USERS.email, email),
    columns: { id: true, name: true, email: true, imageUrl: true, password: true },
  });

  // checking if user exist or not
  if (!isUserExist) throw new AppError("User not found", 404);

  // checking if password is correct
  const isPasswordMatch = await comparePassword(password, isUserExist.password!);
  if (!isPasswordMatch) throw new AppError("Password does not match", 400);

  const { id, name, imageUrl } = isUserExist;
  const accessToken = generateAccessToken({ id, name, email, imageUrl });
  const refreshToken = generateRefreshToken({ id, email });

  return { accessToken, refreshToken };
};

const loginWithGoogle = async (payload: TLoginWithGooglePayload) => {
  // checking if the user already exist or if he does generate access token if does not create a new user and then generate the access token

  const isUserExist = await db.query.USERS.findFirst({
    where: eq(USERS.email, payload.email),
    columns: { id: true, name: true, email: true, imageUrl: true },
  });

  if (isUserExist) {
    const { id, name, email, imageUrl } = isUserExist;
    const accessToken = generateAccessToken({ id, name, email, imageUrl });
    const refreshToken = generateRefreshToken({ id, email });

    return { accessToken, refreshToken };
  }

  const { name, email, imageUrl } = payload;
  const [user] = await db
    .insert(USERS)
    .values({ name, email, provider: PROVIDERS.GOOGLE, imageUrl })
    .returning({ id: USERS.id });

  const accessToken = generateAccessToken({ id: user.id, name, email, imageUrl });
  const refreshToken = generateRefreshToken({ id: user.id, email });

  return { accessToken, refreshToken };
};

const getAccessToken = async (refreshToken: string) => {
  const decodedUser = decodeRefreshToken(refreshToken);

  if (!decodedUser) throw new AppError("Invalid refresh token", 400);
  const email = decodedUser.email;

  const isUserExist = await db.query.USERS.findFirst({
    where: eq(USERS.email, email),
    columns: { id: true, name: true, email: true, imageUrl: true },
  });

  if (!isUserExist) throw new AppError("User not found", 404);
  const { id, name, imageUrl } = isUserExist;
  const accessToken = generateAccessToken({ id, name, email, imageUrl });

  return { accessToken };
};

const changePassword = async (payload: TChangePasswordPayload, email: string) => {
  const userInfo = await db.query.USERS.findFirst({
    where: eq(USERS.email, email),
    columns: { password: true, provider: true },
  });

  if (!userInfo) throw new AppError("User not found", 404);
  if (userInfo.provider === PROVIDERS.GOOGLE) throw new AppError("You are not allowed to change password", 400);

  const isPasswordMatch = await comparePassword(payload.oldPassword, userInfo.password!);
  if (!isPasswordMatch) throw new AppError("Password does not change", 400);

  const password = await hashPassword(payload.newPassword);
  await db.update(USERS).set({ password });

  return "Password changed successfully";
};

export const authService = { register, loginWithCredentials, loginWithGoogle, getAccessToken, changePassword };
