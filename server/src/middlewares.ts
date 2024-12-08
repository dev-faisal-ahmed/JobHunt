import { db } from "./db";
import { eq } from "drizzle-orm";
import { USERS } from "./db/schema";

import { RequestHandler, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "./helpers/appError";
import { decodeAccessToken } from "./helpers/common";
import { sendErrorResponse } from "./helpers/responseHelpers";
import { AnyZodObject, ZodEffects } from "zod";
import { config } from "./app/config";

// async handlers
export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

// auth guard
const BEARER = "bearer";
export const authGuard = catchAsync(async (req, _, next) => {
  const token = req.headers.authorization;
  if (!token) throw new AppError("No token found", 404);

  const [bearerPart, tokenPart] = token.split(" ");
  if (bearerPart.toLowerCase() !== BEARER || !tokenPart) throw new AppError("Invalid token formate", 400);

  const decodedUser = decodeAccessToken(tokenPart);
  if (!decodedUser) throw new AppError("Invalid token", 400);

  const { email } = decodedUser;
  const isUserExist = await db.query.USERS.findFirst({
    where: eq(USERS.email, email),
    columns: { id: true, email: true },
  });

  if (!isUserExist) throw new AppError("User not found!", 404);

  req.user = isUserExist;
  next();
});

// validation handlers
export const validationHandler = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return catchAsync(async (req, _, next) => {
    const data = await schema.parseAsync(req.body);
    req.body = data;
    next();
  });
};

// global error handlers
export const globalErrorHandler: ErrorRequestHandler = (error, _, res, __) => {
  let status: number = error.status || 500;
  let message: string = error.message || "something went wrong";

  // handling error for zod
  if (error.name === "ZodError") {
    const issues = error.issues as { message: string }[];
    message = issues.map(({ message }) => message).join(" | ");
  }

  if (error.name === "NeonDbError") {
    message = error.detail;
  }

  const errorInfo = config.NODE_ENV === "development" ? error : null;

  sendErrorResponse(res, { status, message, error: errorInfo });
};
