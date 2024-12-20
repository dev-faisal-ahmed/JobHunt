import { ErrorRequestHandler } from "express";
import { NODE_ENV } from "../app/config";
import { sendErrorResponse } from "../helpers/responseHelpers";

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

  const errorInfo = NODE_ENV === "development" ? error : null;

  sendErrorResponse(res, { status, message, error: errorInfo });
};
