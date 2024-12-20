import { Router } from "express";
import { authGuard } from "../../middlewares/authGuard";
import { companyValidation } from "./company.validation";
import { companyController } from "./company.controller";
import { validationHandler } from "../../middlewares/validationHandler";

export const companyRouter = Router();

companyRouter.post("/", authGuard, validationHandler(companyValidation.addCompanySchema), companyController.addCompany);
