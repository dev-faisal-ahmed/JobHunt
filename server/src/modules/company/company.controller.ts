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

const getCompanyById = catchAsync(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.companyId);
  sendSuccessResponse(res, { message: "Company retrieved successfully", data: company });
});

const updateCompanyById = catchAsync(async (req, res) => {
  const message = await companyService.updateCompanyById(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const deleteCompanyById = catchAsync(async (req, res) => {
  const message = await companyService.deleteCompanyById(req.params.companyId);
  sendSuccessResponse(res, { message, data: null });
});

export const companyController = { addCompany, getCompanies, getCompanyById, updateCompanyById, deleteCompanyById };
