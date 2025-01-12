import DatePicker from "../components/DatePicker";

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
  setFilters: (filters: Partial<Lead>) => void;
}

const LeadsTable = ({
  data,
  loading,
  filters,
  setFilters,
}: LeadsTableProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          id="firstName"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Nombre"
          value={filters.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="lastName"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Apellido"
          value={filters.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Email"
          value={filters.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="phone"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Telefono"
          value={filters.phone}
          onChange={handleInputChange}
          required
        />
        <DatePicker handleInputChange={handleInputChange} />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            {data.map((lead) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
