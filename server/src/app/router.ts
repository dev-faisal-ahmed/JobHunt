import { Router } from "express";
import { authRouter } from "../modules/auth/auth.router";
import { companiesRouter, companyRouter } from "../modules/company/company.router";
import { applicationRouter, applicationsRouter } from "../modules/application/application.router";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/company", companyRouter);
appRouter.use("/companies", companiesRouter);
appRouter.use("/application", applicationRouter);
appRouter.use("/applications", applicationsRouter);
