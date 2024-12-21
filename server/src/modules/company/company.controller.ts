import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middlewares/catchAsync";
import { companyService } from "./company.service";

const addCompany = catchAsync(async (req, res) => {
  const message = await companyService.addCompany(req.body, req.user.id);
  sendSuccessResponse(res, { message, data: null });
});

const getCompanies = catchAsync(async (req, res) => {
  const { companies, meta } = await companyService.getCompanies(req.query, req.user.id);
  sendSuccessResponse(res, { message: "Companies retrieved successfully", meta, data: companies });
});

export const companyController = { addCompany, getCompanies };
