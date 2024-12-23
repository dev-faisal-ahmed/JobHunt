import jwt from "jsonwebtoken";

import { z } from "zod";
import { IMeta } from "./responseHelpers";
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

// ************** QUERY HELPER ************** \\

interface IGeneratePaginationArgs {
  query: Record<string, string>;
  defaultLimit?: number;
  total: number;
}

export const generatePaginationArgs = ({ query, defaultLimit = 20, total = 0 }: IGeneratePaginationArgs) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || defaultLimit;
  const offset = (page - 1) * limit;

  const meta: IMeta = { page, limit, total, totalPages: Math.ceil(total / limit) };

  return { offset, meta };
};

// ************** ZOD HELPER ************** \\

export const enumGenerator = (options: string[], message: string) => {
  return z.enum([...(options as [string, ...string[]])], { message });
};
