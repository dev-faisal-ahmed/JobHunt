import cors from "cors";
import express from "express";
import cookiesParser from "cookie-parser";

import { appRouter } from "./router";
import { globalErrorHandler } from "../middlewares/globalErrorHandler";

export const app = express();

// parser
app.use(express.json());
app.use(cookiesParser());
app.use(cors());

// apis
app.use("/api/v1", appRouter);

app.get("/", (_req, res) => {
  res.status(200).json({ ok: true, message: "Welcome to JobVault server" });
});

app.all("*", (_req, res) => {
  res.status(404).json({ ok: false, message: "Router not found" });
});

app.use(globalErrorHandler);
