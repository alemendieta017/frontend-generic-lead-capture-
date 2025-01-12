import config from "../config/config";

interface LeadFilters {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const getLeads = async (
  token: string,
  pageIndex: number,
  pageSize: number,
  filters: LeadFilters,
) => {
  const queryParams = new URLSearchParams({
    offset: (pageIndex * pageSize).toString(),
    limit: pageSize.toString(),
    ...filters,
  });

  const response = await fetch(
    `${config.API_URL}/leads?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Error fetching leads");
  }

  return response.json();
};

const countLeads = async (token: string, filters: LeadFilters) => {
  const queryParams = new URLSearchParams({ ...filters });
  const response = await fetch(
    `${config.API_URL}/leads/count?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Error counting leads");
  }

  const result = await response.json();
  return result.count;
};

export { getLeads, countLeads };
