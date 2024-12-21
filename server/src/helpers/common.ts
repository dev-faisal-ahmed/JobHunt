import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../app/config";

// ************** DATE HELPER ************** \\
export const isValidDate = (date: string) => {
  const dateObject = new Date(date);
  return !isNaN(dateObject.getTime());
};

// ************** TOKEN HELPER ************** \\
interface IAcessTokenData {
  id: string;
  email: string;
  name: string;
  imageUrl?: string | null;
}

export const generateAccessToken = (payload: IAcessTokenData) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: "30d" });
};

interface IRefreshTokenData {
  id: string;
  email: string;
}

export const generateRefreshToken = (payload: IRefreshTokenData) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET!, { expiresIn: "90d" });
};

export const decodeAccessToken = (accessToken: string) => {
  const decodedData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET!);
  if (!decodedData) return null;

  return decodedData as IAcessTokenData;
};

export const decodeRefreshToken = (refreshToken: string) => {
  const decodedData = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!);
  if (!decodedData) return null;

  return decodedData as IRefreshTokenData;
};
