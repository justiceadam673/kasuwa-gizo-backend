
async function paginateAndSearch(Model, queryParams, searchField = "title") {
  const { page = "1", limit = "10", search = "" } = queryParams;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const query =
    search && typeof search === "string"
      ? { [searchField]: { $regex: search, $options: "i" } }
      : {};

  const skip = (pageNumber - 1) * limitNumber;

  const data = await Model.find(query)
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 });

  const total = await Model.countDocuments(query);
  const totalPages = Math.ceil(total / limitNumber);

  return {
    success: true,
    total,
    page: pageNumber,
    totalPages,
    limit: limitNumber,
    data,
  };
}


export default paginateAndSearch;