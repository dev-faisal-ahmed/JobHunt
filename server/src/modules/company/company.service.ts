import { db } from "../../db";
import { and, eq } from "drizzle-orm";
import { TAddCompanyPayload } from "./company.validation";
import { companyTable } from "../../db/schema";
import { AppError } from "../../helpers/appError";

const addCompany = async (payload: TAddCompanyPayload, userId: string) => {
  // checking if this company is already added or not
  const isCompanyExist = await db.query.companyTable.findFirst({
    where: and(eq(companyTable.userId, userId), eq(companyTable.name, payload.name)),
  });

  if (isCompanyExist) throw new AppError("Company already exist", 400);

  await db.insert(companyTable).values({ ...payload, userId });

  return "Company added successfully!";
};

export const companyService = { addCompany };
