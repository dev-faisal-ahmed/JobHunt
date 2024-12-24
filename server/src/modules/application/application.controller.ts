import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middlewares/catchAsync";
import { applicationService } from "./application.service";

const createApplication = catchAsync(async (req, res) => {
  const message = await applicationService.createApplication(req.body, req.user.id);
  sendSuccessResponse(res, { message, data: null });
});

const getApplications = catchAsync(async (req, res) => {
  const { applications, meta } = await applicationService.getApplications(req.query, req.user.id);
  sendSuccessResponse(res, { message: "Applications retrieved successfully", meta, data: applications });
});

export const applicationController = { createApplication, getApplications };
