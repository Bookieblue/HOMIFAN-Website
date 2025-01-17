export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export async function paginateQuery<T>({
  model,
  options,
  where,
  select,
  include,
  orderBy,
}: {
  model: any;
  options: PaginationOptions;
  where?: object;
  select?: object;
  include?: object;
  orderBy?: object;
}): Promise<PaginationResult<T>> {
  const { page, limit: perPage } = options;
  const skip = (page - 1) * perPage;

  // Fetch the data and count total items simultaneously
  const [data, totalItems] = await Promise.all([
    model.findMany({
      skip,
      take: perPage,
      where,
      select,
      include,
      orderBy,
    }),
    model.count({ where }),
  ]);

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    totalItems,
    page,
    perPage,
    totalPages,
  };
}
