import React from "react";

interface LeadsPaginationProps {
  totalRecords: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageIndex: number;
  setPageIndex: (index: number | ((prevIndex: number) => number)) => void;
}

const LeadsPagination = ({
  totalRecords,
  pageSize,
  setPageSize,
  pageIndex,
  setPageIndex,
}: LeadsPaginationProps) => {
  return (
    <div className="pagination mt-4">
      <button
        onClick={() => setPageIndex(0)}
        disabled={pageIndex === 0}
        className="mr-2 rounded bg-primary px-4 py-2 text-white"
      >
        {"<<"}
      </button>
      <button
        onClick={() =>
          setPageIndex((prevIndex: number) => Math.max(prevIndex - 1, 0))
        }
        disabled={pageIndex === 0}
        className="mr-2 rounded bg-primary px-4 py-2 text-white"
      >
        {"<"}
      </button>
      <button
        onClick={() =>
          setPageIndex((prev) =>
            (prev + 1) * pageSize < totalRecords ? prev + 1 : prev,
          )
        }
        disabled={(pageIndex + 1) * pageSize >= totalRecords}
        className="mr-2 rounded bg-primary px-4 py-2 text-white"
      >
        {">"}
      </button>
      <button
        onClick={() => setPageIndex(Math.ceil(totalRecords / pageSize) - 1)}
        disabled={(pageIndex + 1) * pageSize >= totalRecords}
        className="rounded bg-primary px-4 py-2 text-white"
      >
        {">>"}
      </button>
      <span className="ml-4">
        Página{" "}
        <strong>
          {pageIndex + 1} de {Math.ceil(totalRecords / pageSize)}
        </strong>{" "}
      </span>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
        className="ml-4 rounded border px-4 py-2"
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            Mostrar {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeadsPagination;
