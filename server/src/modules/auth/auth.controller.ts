import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middleware/catchAsync";
import { authService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const response = await authService.register();
  sendSuccessResponse(res, { message: "User created successfully", data: response });
});

export const authController = { login };
