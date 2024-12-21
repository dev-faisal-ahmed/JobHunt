import { IMeta } from "./responseHelpers";

interface IGeneratePaginationArgs {
  query: Record<string, string>;
  defaultLimit?: number;
  total: number;
}

export const generatePaginationArgs = ({ query, defaultLimit = 20, total = 0 }: IGeneratePaginationArgs) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || defaultLimit;
  const offset = (page - 1) * limit;

  const meta: IMeta = { page, limit, total, totalPages: Math.ceil(total / limit) };

  return { offset, meta };
};
