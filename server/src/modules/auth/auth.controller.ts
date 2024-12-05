import { authService } from "./auth.service";
import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middleware/catchAsync";

const register = catchAsync(async (req, res) => {
  const message = await authService.register(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.login(req.body);
  res.cookie("refresh_token", refreshToken);
  sendSuccessResponse(res, { message: "Login was successful", data: { accessToken } });
});

export const authController = { register, login };
