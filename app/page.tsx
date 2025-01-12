"use client";
import React from "react";
import Navbar from "./components/Navbar";
import LeadsTable from "./components/LeadsTable";
import LeadsPagination from "./components/LeadsPagination";
import { useLeads } from "./hooks/useLeads";

export default function Home() {
  const {
    data,
    totalRecords,
    pageIndex,
    pageSize,
    loading,
    setPageIndex,
    setPageSize,
    filters,
    setFilters,
  } = useLeads();

  return (
    <div className="min-h-screen bg-gray-100 max-w-full">
      <Navbar />
      <main className="container mx-auto py-8 px-2">
        <h1 className="text-primary mb-4 text-2xl font-bold">Leads</h1>
        <LeadsTable data={data} loading={loading} filters={filters} setFilters={setFilters} />
        <LeadsPagination
          totalRecords={totalRecords}
          pageSize={pageSize}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      </main>
    </div>
  );
}
