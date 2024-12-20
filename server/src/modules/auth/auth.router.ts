import { Router } from "express";
import { authController } from "./auth.controller";
import { validationHandler, authGuard } from "../../middlewares";
import { authValidation } from "./auth.validation";

export const authRouter = Router();

authRouter.post("/register", validationHandler(authValidation.registerSchema), authController.register);

authRouter.post(
  "/login/credentials",
  validationHandler(authValidation.loginWithCredentialsSchema),
  authController.loginWithCredentials,
);

authRouter.post(
  "/login/google",
  validationHandler(authValidation.loginWithGoogleSchema),
  authController.loginWithGoogle,
);

authRouter.get("/get-access-token", authController.getAccessToken);

authRouter.post(
  "/change-password",
  authGuard,
  validationHandler(authValidation.changePasswordSchema),
  authController.changePassword,
);
