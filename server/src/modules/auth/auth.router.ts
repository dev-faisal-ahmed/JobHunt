import { Router } from "express";
import { authController } from "./auth.controller";
import { validationHandler } from "../../middleware/validationHandler";
import { authValidation } from "./auth.validation";

export const authRouter = Router();

authRouter.post("/register", validationHandler(authValidation.registerSchema), authController.register);
