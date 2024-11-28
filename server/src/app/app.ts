import cors from "cors";
import express from "express";

import { globalErrorHandler } from "../middleware/globalErrorHandler";
import { authRouter } from "../modules/auth/auth.router";

export const app = express();

// parser
app.use(express.json());
app.use(cors());

// apis
// app.use("/api/v1", appRouter);
app.use("/api/v1", authRouter);

app.get("/", (_req, res) => {
  res.status(200).json({ ok: true, message: "Welcome to JobVault server" });
});

app.all("*", (_req, res) => {
  res.status(404).json({ ok: false, message: "Router not found" });
});

app.use(globalErrorHandler);
