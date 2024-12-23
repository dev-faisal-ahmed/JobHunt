import { db } from "../../db";
import { and, asc, count, desc, eq, ilike, or } from "drizzle-orm";
import { TAddCompanyPayload, TUpdateCompanyPayload } from "./company.validation";
import { generatePaginationArgs } from "../../helpers/common";
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

const getCompanies = async (query: Record<string, any>, userId: string) => {
  const name = query.name;
  const location = query.location;
  const email = query.email;
  const orderBy = query.orderBy;

  const generateFilter = () => {
    return and(
      eq(companyTable.userId, userId),
      or(
        name ? ilike(companyTable.name, `%${name}%`) : undefined,
        location ? ilike(companyTable.location, `%${location}%`) : undefined,
        email ? ilike(companyTable.email, email) : undefined
      )
    );
  };

  const [documentCount] = await db.select({ count: count() }).from(companyTable).where(generateFilter());
  const { offset, meta } = generatePaginationArgs({ query, total: documentCount.count });

  const companies = await db.query.companyTable.findMany({
    offset,
    limit: meta.limit,
    where: generateFilter(),
    with: { applications: { columns: { id: true } } },
    orderBy: orderBy?.toLowerCase() === "asc" ? asc(companyTable.createdAt) : desc(companyTable.createdAt),
  });

  return { companies, meta };
};

const getCompanyById = async (companyId: string) => {
  const company = await db.query.companyTable.findFirst({
    where: eq(companyTable.id, companyId),
    with: { applications: true },
  });

  return company;
};

const updateCompanyById = async (payload: TUpdateCompanyPayload) => {
  const { companyId, ...restPayload } = payload;
  await db.update(companyTable).set(restPayload).where(eq(companyTable.id, companyId));
  return "Company updated successfully!";
};

const deleteCompanyById = async (companyId: string) => {
  await db.delete(companyTable).where(eq(companyTable.id, companyId));
  return "Company deleted successfully!";
};

export const companyService = { addCompany, getCompanies, getCompanyById, updateCompanyById, deleteCompanyById };
