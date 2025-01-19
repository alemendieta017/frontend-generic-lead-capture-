import React from "react";

interface LeadsPaginationProps {
  totalRecords: number;
  pageSize: number;
  pageIndex: number;
  setPageIndex: (index: number | ((prevIndex: number) => number)) => void;
}

const LeadsPagination = ({
  totalRecords,
  pageSize,
  pageIndex,
  setPageIndex,
}: LeadsPaginationProps) => {
  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePrevious = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 1));
  };

  const handleNext = () => {
    setPageIndex((prevIndex) => Math.min(prevIndex + 1, totalPages));
  };

  return (
    <div className="flex flex-col items-center bg-white p-6">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Mostrando{" "}
        <span className="font-semibold text-primary-900 dark:text-white">
          {Math.min((pageIndex - 1) * pageSize + 1, totalRecords)}
        </span>{" "}
        a{" "}
        <span className="font-semibold text-primary-900 dark:text-white">
          {Math.min(pageIndex * pageSize, totalRecords)}
        </span>{" "}
        de{" "}
        <span className="font-semibold text-primary-900 dark:text-white">
          {totalRecords}
        </span>{" "}
        Registros
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button
          onClick={handlePrevious}
          className="bg-primary-500 hover:bg-primary-900 dark:border-primary-700 dark:bg-primary-500 dark:hover:bg-primary-700 flex h-10 items-center justify-center rounded-s px-4 text-base font-medium text-white dark:text-gray-400 dark:hover:text-white"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="border-primary-700 bg-primary-500 hover:bg-primary-900 dark:border-primary-700 dark:bg-primary-500 dark:hover:bg-primary-700 flex h-10 items-center justify-center rounded-e border-0 border-s px-4 text-base font-medium text-white dark:text-gray-400 dark:hover:text-white"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default LeadsPagination;
