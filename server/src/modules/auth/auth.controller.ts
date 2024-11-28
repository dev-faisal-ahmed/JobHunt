import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middleware/catchAsync";
import { authService } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const message = await authService.register(req.body);
  sendSuccessResponse(res, { message, data: null });
});

export const authController = { register };
