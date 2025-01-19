"use client";
const DatePicker = ({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <label htmlFor="fromDate" className="text-sm text-gray-500">
          Desde:
        </label>

        <input
          name="dateFrom"
          type="date"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm placeholder:text-gray-500 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
          placeholder="Seleccione fecha de inicio"
          onChange={(e) => {
            const isoDate = new Date(e.target.value).toISOString();
            handleInputChange({
              target: { name: "dateFrom", value: isoDate },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        />
      </div>
      <div className="flex-1">
        <label className="mx-4 text-gray-500">Hasta:</label>
        <input
          name="dateTo"
          type="date"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Seleccione fecha de fin"
          onChange={(e) => {
            const isoDate = new Date(e.target.value).toISOString();
            handleInputChange({
              target: { name: "dateTo", value: isoDate },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        />
      </div>
    </div>
  );
};

export default DatePicker;
