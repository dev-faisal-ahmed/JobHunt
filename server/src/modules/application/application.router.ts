import { Router } from "express";
import { authGuard } from "../../middlewares/authGuard";
import { validationHandler } from "../../middlewares/validationHandler";
import { applicationValidation } from "./application.validation";
import { applicationController } from "./application.controller";

export const applicationRouter = Router();

applicationRouter.post(
  "/",
  authGuard,
  validationHandler(applicationValidation.createApplicationSchema),
  applicationController.createApplication
);
