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
  const orderBy = query.orderBy;
  const searchTerm = query.searchTerm;

  const generateFilter = () => {
    return and(
      eq(companyTable.userId, userId),
      or(
        searchTerm ? ilike(companyTable.name, `%${searchTerm}%`) : undefined,
        searchTerm ? ilike(companyTable.location, `%${searchTerm}%`) : undefined,
        searchTerm ? ilike(companyTable.email, `%${searchTerm}%`) : undefined
      )
    );
  };

  const [documentCount] = await db.select({ count: count() }).from(companyTable).where(generateFilter());
  const { offset, meta } = generatePaginationArgs({ query, total: documentCount.count });

  const companies = await db.query.companyTable.findMany({
    where: generateFilter(),
    with: { applications: { columns: { id: true } } },
    orderBy: orderBy?.toLowerCase() === "asc" ? asc(companyTable.createdAt) : desc(companyTable.createdAt),
    offset,
    limit: meta.limit,
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
