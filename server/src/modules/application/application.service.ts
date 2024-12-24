import { db } from "../../db";
import { and, arrayContains, between, count, desc, eq, gte, ilike, lte, or } from "drizzle-orm";
import { applicationTable } from "../../db/schema";
import { TCreateApplicationPayload } from "./application.validation";
import { generatePaginationArgs } from "../../helpers/common";

const createApplication = async (payload: TCreateApplicationPayload, userId: string) => {
  await db.insert(applicationTable).values({ ...payload, userId });
  return "Applied Successfully";
};

const getApplications = async (query: Record<string, any>, userId: string) => {
  const searchTerm = query.searchTerm;
  const dateRange = query.dateRange;
  const dateBefore = query.dateBefore;
  const dateAfter = query.dateAfter;
  const status = query.status;
  const salaryHigher = query.SalaryHigher;
  const salaryLower = query.SalaryLower;

  const [startDate, endDate] = dateRange ? dateRange.split(",") : [undefined, undefined];

  const generateFilter = () => {
    return and(
      eq(applicationTable.userId, userId),
      or(
        searchTerm ? ilike(applicationTable.designation, `%${searchTerm}%`) : undefined,
        searchTerm ? ilike(applicationTable.description, `%${searchTerm}%`) : undefined,
        searchTerm ? arrayContains(applicationTable.skills, [searchTerm]) : undefined,
        dateRange ? between(applicationTable.createdAt, new Date(startDate), new Date(endDate)) : undefined,
        status ? eq(applicationTable.status, status.toUpperCase()) : undefined,
        salaryLower ? lte(applicationTable.salary, salaryLower) : undefined,
        salaryHigher ? gte(applicationTable.salary, salaryHigher) : undefined,
        !dateRange && dateBefore ? lte(applicationTable.createdAt, new Date(dateBefore)) : undefined,
        !dateRange && dateAfter ? gte(applicationTable.createdAt, new Date(dateAfter)) : undefined
      )
    );
  };

  const [documentCount] = await db.select({ count: count() }).from(applicationTable).where(generateFilter());
  const { offset, meta } = generatePaginationArgs({ query, total: documentCount.count });

  const applications = await db.query.applicationTable.findMany({
    where: generateFilter(),
    orderBy: desc(applicationTable.createdAt),
    with: {
      interviews: { columns: { id: true, interviewDate: true } },
      tasks: { columns: { id: true, deadline: true } },
    },
    offset,
    limit: meta.limit,
  });

  return { applications, meta };
};

export const applicationService = { createApplication, getApplications };
