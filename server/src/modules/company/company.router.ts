import { Router } from "express";
import { authGuard } from "../../middlewares/authGuard";
import { companyValidation } from "./company.validation";
import { companyController } from "./company.controller";
import { validationHandler } from "../../middlewares/validationHandler";

export const companyRouter = Router();

companyRouter.post("/", authGuard, validationHandler(companyValidation.addCompanySchema), companyController.addCompany);
companyRouter.get("/:companyId", authGuard, companyController.getCompanyById);

companyRouter.patch(
  "/",
  authGuard,
  validationHandler(companyValidation.updateCompanySchema),
  companyController.updateCompanyById
);

companyRouter.delete("/:companyId", authGuard, companyController.deleteCompanyById);

export const companiesRouter = Router();

companiesRouter.get("/", authGuard, companyController.getCompanies);
