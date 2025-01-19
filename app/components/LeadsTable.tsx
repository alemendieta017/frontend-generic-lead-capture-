import React, { useCallback } from "react";
import DatePicker from "../components/DatePicker";
import Loader from "./Loader";

interface Lead {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface LeadsTableProps {
  data: Lead[];
  loading: boolean;
  filters: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  setFilters: (filters: LeadsTableProps["filters"]) => void;
}

const LeadsTable = ({
  data,
  loading,
  filters,
  setFilters,
}: LeadsTableProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(name, value);
      const newFilters = { ...filters };

      if (value) {
        newFilters[name as keyof LeadsTableProps["filters"]] = value;
      } else {
        delete newFilters[name as keyof LeadsTableProps["filters"]];
      }

      console.log(newFilters);

      setFilters(newFilters);
    },
    [filters, setFilters],
  );

  return (
    <div>
      <div className="mb-4 flex flex-row flex-wrap md:flex-nowrap md:space-x-2 items-end">
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="w-1/2 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Nombre"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="w-1/2 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Apellido"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="email"
          name="email"
          className="w-1/2 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="phone"
          name="phone"
          className="w-1/2 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Telefono"
          onChange={handleInputChange}
          required
        />
      </div>
      <DatePicker handleInputChange={handleInputChange} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <Loader />
        ) : (
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Apellido
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefono
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha de Registro
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-center" colSpan={5}>
                    Sin registros
                  </td>
                </tr>
              ) : (
                data.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{lead.firstName}</td>
                    <td className="px-6 py-4">{lead.lastName}</td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">{lead.phone}</td>
                    <td className="px-6 py-4">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeadsTable;
