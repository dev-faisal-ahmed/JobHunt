import { db } from "../../db";
import { and, eq } from "drizzle-orm";
import { TAddCompanyPayload } from "./company.validation";
import { companyTable } from "../../db/schema";
import { AppError } from "../../helpers/appError";
import { generatePaginationArgs } from "../../helpers/queryHelper";

const addCompany = async (payload: TAddCompanyPayload, userId: string) => {
  // checking if this company is already added or not
  const isCompanyExist = await db.query.companyTable.findFirst({
    where: and(eq(companyTable.userId, userId), eq(companyTable.name, payload.name)),
  });

  if (isCompanyExist) throw new AppError("Company already exist", 400);

  await db.insert(companyTable).values({ ...payload, userId });

  return "Company added successfully!";
};

const getCompanies = async (query: Record<string, any>, userId: string) => {
  const { page, limit, offset } = generatePaginationArgs(query);

  const name = query.name;
  const location = query.location;
  const email = query.email;
  const orderBy = query.orderBy;

  const companies = await db.query.companyTable.findMany({
    offset,
    limit,
    orderBy: (fields, operators) =>
      orderBy?.toLowerCase() === "asc" ? operators.asc(fields.createdAt) : operators.desc(fields.createdAt),
    where: (fields, operators) =>
      operators.and(
        operators.eq(fields.userId, userId),
        operators.or(
          name ? operators.ilike(fields.name, `%${name}%`) : undefined,
          location ? operators.ilike(fields.location, `%${location}%`) : undefined,
          email ? operators.ilike(fields.email, email) : undefined
        )
      ),
    with: { applications: { columns: { id: true } } },
  });

  return companies;
};

export const companyService = { addCompany, getCompanies };
