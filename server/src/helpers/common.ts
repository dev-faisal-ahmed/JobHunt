import jwt from "jsonwebtoken";

import { config } from "../app/config";

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
  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET!, { expiresIn: "30m" });
};

interface IRefreshTokenData {
  id: string;
  email: string;
}

export const generateRefreshToken = (payload: IRefreshTokenData) => {
  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET!, { expiresIn: "90d" });
};
