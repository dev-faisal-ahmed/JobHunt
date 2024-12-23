import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middlewares/catchAsync";
import { applicationService } from "./application.service";

const createApplication = catchAsync(async (req, res) => {
  const message = await applicationService.createApplication(req.body, req.user.id);
  sendSuccessResponse(res, { message, data: null });
});

export const applicationController = { createApplication };
