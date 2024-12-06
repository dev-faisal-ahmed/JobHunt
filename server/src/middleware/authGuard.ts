import { db } from "../db";
import { eq } from "drizzle-orm";
import { AppError } from "../helpers/appError";
import { decodeAccessToken } from "../helpers/common";
import { catchAsync } from "./catchAsync";
import { USERS } from "../db/schema";

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
