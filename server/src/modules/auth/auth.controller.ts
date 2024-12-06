import { authService } from "./auth.service";
import { sendSuccessResponse } from "../../helpers/responseHelpers";
import { catchAsync } from "../../middleware/catchAsync";

const register = catchAsync(async (req, res) => {
  const message = await authService.register(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const loginWithCredentials = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginWithCredentials(req.body);
  res.cookie("refresh_token", refreshToken);
  sendSuccessResponse(res, { message: "Login was successful", data: { accessToken } });
});

const loginWithGoogle = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginWithGoogle(req.body);
  res.cookie("refresh_token", refreshToken);
  sendSuccessResponse(res, { message: "Login was successful", data: { accessToken } });
});

const getAccessToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies["refresh_token"];
  const { accessToken } = await authService.getAccessToken(refreshToken);
  sendSuccessResponse(res, { message: "Access token retrieved successfully", data: { accessToken } });
});

const changePassword = catchAsync(async (req, res) => {
  const message = await authService.changePassword(req.body, req.user.email);
  sendSuccessResponse(res, { message, data: null });
});

export const authController = { register, loginWithCredentials, loginWithGoogle, getAccessToken, changePassword };
