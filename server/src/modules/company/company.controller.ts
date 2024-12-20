import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middlewares/catchAsync";
import { companyService } from "./company.service";

const addCompany = catchAsync(async (req, res) => {
  const message = await companyService.addCompany(req.body, req.user.id);
  sendSuccessResponse(res, { message, data: null });
});

export const companyController = { addCompany };
