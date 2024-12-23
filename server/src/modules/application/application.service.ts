import { db } from "../../db";
import { applicationTable } from "../../db/schema";
import { TCreateApplicationPayload } from "./application.validation";

const createApplication = async (payload: TCreateApplicationPayload, userId: string) => {
  await db.insert(applicationTable).values({ ...payload, userId });
  return "Applied Successfully";
};

export const applicationService = { createApplication };
