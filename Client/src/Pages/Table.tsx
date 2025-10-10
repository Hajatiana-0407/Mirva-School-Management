import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Loading from '../Components/ui/Loading';
import ActionMenu from '../Components/ActionMenu';

interface TableProps {
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }>;
  actions?: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: (item: any) => void;
    color: string;
  }>;
  searchTerm?: string;
  isLoading?: boolean;
  actionType?: 'button' | 'pop-up'
}

const Table = ({ data, columns, actions, searchTerm = '', isLoading = false, actionType = 'button' }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // RECHERCHE
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculer les éléments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

 const getActionColor = (color: string) => {
  const colors = {
    blue: 'text-blue-600 hover:text-blue-800',
    green: 'text-green-600 hover:text-green-800',
    red: 'text-red-600 hover:text-red-800',
    yellow: 'text-yellow-600 hover:text-yellow-800',
    purple: 'text-purple-600 hover:text-purple-800',
    pink: 'text-pink-600 hover:text-pink-800',
    indigo: 'text-indigo-600 hover:text-indigo-800',
    teal: 'text-teal-600 hover:text-teal-800',
    orange: 'text-orange-600 hover:text-orange-800',
    gray: 'text-gray-600 hover:text-gray-800',
  };
  return colors[color as keyof typeof colors] || 'text-gray-600 hover:text-gray-800';
};




  return (
    <div className="space-y-4">
      <div className="overflow-visible">
        {/* wrapper horizontal */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b w-max">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="text-left py-3 px-4 font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {column.label}
                  </th>
                ))}
                {actions && actions.length > 0 && (
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {(isLoading && !currentItems.length) ? (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <Loading />
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 w-max">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="py-3 px-4 text-gray-900 truncate max-w-80"
                      >
                        {column.render
                          ? column.render(item[column.key], item)
                          : item[column.key]}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className="py-3 px-4">
                        <div className="flex justify-center space-x-2">
                          {/* Boutons d'action */}
                          {actionType === 'button' &&
                            actions.map((action, actionIndex) => {
                              const Icon = action.icon;
                              return (
                                <button
                                  key={actionIndex}
                                  onClick={() => action.onClick(item)}
                                  className={`p-1 rounded hover:bg-gray-100 ${getActionColor(action.color)}`}
                                  title={action.label}
                                  type='button'
                                >
                                  <Icon className="w-4 h-4" />
                                </button>
                              );
                            })}

                          {/* Action pop-up */}
                          {actionType === 'pop-up' && (
                            <ActionMenu
                              actions={actions.map((action) => ({
                                ...action,
                                onClick: () => action.onClick(item),
                                color: getActionColor(action.color),
                              }))}
                            />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {indexOfFirstItem + 1} à{" "}
            {Math.min(indexOfLastItem, filteredData.length)} sur{" "}
            {filteredData.length} éléments
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-50"
                  }`}
                type="button"
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              type="button"
              className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default Table;