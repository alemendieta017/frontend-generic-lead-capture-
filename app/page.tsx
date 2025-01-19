"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import LeadsTable from "./components/LeadsTable";
import LeadsPagination from "./components/LeadsPagination";
import { useLeads } from "./hooks/useLeads";
import { useAuth } from "./context/authContext";
import Loader from "./components/Loader";

export default function Home() {
  const { initializing, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !token) {
      router.push("/login");
    }
  }, [initializing, token, router]);

  const {
    data,
    totalRecords,
    pageIndex,
    pageSize,
    loading,
    setPageIndex,
    filters,
    setFilters,
  } = useLeads(token);

  if (initializing || !token) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen max-w-full bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-2 py-8 grow">
        <h1 className="mb-4 text-2xl font-bold text-primary-500">Leads</h1>
        <LeadsTable
          data={data}
          loading={loading}
          filters={filters}
          setFilters={setFilters}
        />
        <LeadsPagination
          totalRecords={totalRecords}
          pageSize={pageSize}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </main>
    </div>
  );
}
