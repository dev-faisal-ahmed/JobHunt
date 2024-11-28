import { Router } from "express";
import { authRouter } from "../modules/auth/auth.router";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
