import { useState, useEffect } from "react";
import { getLeads, countLeads } from "../services/leadService";
import useDebounce from "./useDebounce";

interface Lead {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export const useLeads = (token: string | null) => {
  const [data, setData] = useState<Lead[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 300);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getLeads(
          token,
          pageIndex,
          pageSize,
          debouncedFilters,
        );
        setData(result);

        const count = await countLeads(token, debouncedFilters);
        setTotalRecords(count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, pageIndex, pageSize, debouncedFilters]);

  return {
    data,
    totalRecords,
    pageIndex,
    pageSize,
    filters,
    setFilters,
    loading,
    setPageIndex,
    setPageSize,
  };
};
