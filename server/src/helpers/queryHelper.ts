export const generatePaginationArgs = (query: Record<string, string>, defaultLimit: number = 20) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || defaultLimit;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};
