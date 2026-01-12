import { ReactNode } from 'react';
import clsx from 'clsx';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  className,
}: DataTableProps<T>) {
  const getCellContent = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as ReactNode;
  };

  return (
    <div className={clsx('overflow-hidden rounded-lg border border-gray-200 bg-white', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={clsx(
                    'px-4 py-3 text-left text-xs font-normal text-gray-500',
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors duration-100">
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={clsx('whitespace-nowrap px-4 py-4 text-sm', column.className)}
                  >
                    {getCellContent(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
