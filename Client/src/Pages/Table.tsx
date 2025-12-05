import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Loading from '../Components/ui/Loading';
import ActionMenu from '../Components/ActionMenu';
import RightClickMenu from '../Components/RightClickMenu';
import { useHashPermission } from '../Hooks/useHashPermission';
import clsx from 'clsx';
import { PaginationType } from '../Utils/Types';
import { AsyncThunk } from '@reduxjs/toolkit';
import { usePagination } from '../Hooks/usePagination';

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
    type?: string
  }>;
  isLoading?: boolean;
  actionType?: 'button' | 'pop-up';
  onRowClick?: (item: any) => void;
  idModule?: string;
  pagination: PaginationType;
  thunk: AsyncThunk<any, {
    page?: number;
    query?: any;
  }, any>
}

export const getActionColor = (color: string) => {
  const colors = {
    primary: 'text-primary-600 hover:text-primary-800',
    green: 'text-green-600 hover:text-green-800',
    red: 'text-red-600 hover:text-red-800',
    yellow: 'text-yellow-600 hover:text-yellow-800',
    purple: 'text-purple-600 hover:text-purple-800',
    pink: 'text-pink-600 hover:text-pink-800',
    indigo: 'text-indigo-600 hover:text-indigo-800',
    teal: 'text-teal-600 hover:text-teal-800',
    orange: 'text-orange-600 hover:text-orange-800',
    secondary: 'text-secondary-600 hover:text-secondary-800',
  };
  return colors[color as keyof typeof colors] || 'text-secondary-600 hover:text-secondary-800';
};

const Table = ({ data, columns, actions, isLoading = false, actionType = 'button', onRowClick, idModule, pagination, thunk }: TableProps) => {
  const permission = useHashPermission({ redirect: true });
  const { handlePageChange, isLoading: paginationLoading, newPage } = usePagination({ thunk, page: pagination.page })

  // État pour le menu contextuel
  const [rightClickMenu, setRightClickMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
    item: any | null;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
    item: null
  });

  // Gestion du clic droit
  const handleRightClick = (event: React.MouseEvent, item: any) => {
    event.preventDefault();
    event.stopPropagation();

    setRightClickMenu({
      isOpen: true,
      x: event.clientX,
      y: event.clientY,
      item: item
    });
  };

  // Fermer le menu contextuel
  const closeRightClickMenu = () => {
    setRightClickMenu(prev => ({ ...prev, isOpen: false }));
  };

  // Préparer les actions pour le menu contextuel
  const getRightClickActions = () => {
    if (!actions || !rightClickMenu.item) return [];

    return actions.map((action) => ({
      ...action,
      onClick: () => {
        action.onClick(rightClickMenu.item);
        closeRightClickMenu();
      },
      color: getActionColor(action.color)
    }));
  };



  return (
    <div className="space-y-4">
      <div className="overflow-visible">
        {/* wrapper horizontal */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b w-max rounded shadow shadow-primary-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="text-left text-sm md:text-md py-3 px-4 font-semibold text-secondary-700 uppercase lightspace-nowrap"
                  >
                    {column.label}
                  </th>
                ))}
                {actions && actions.length > 0 && (
                  <th className="text-center text-sm md:text-md  py-3 px-4 font-semibold text-secondary-700 uppercase">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>

              {/* LOADING */}
              {(isLoading && !data.length) ? (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <Loading />
                  </td>
                </tr>
              )
                // ?  AUCUN RESULTAT
                : (!isLoading && !data.length) ? (
                  <tr>
                    <td colSpan={columns.length + 1} className=''>
                      <div className='text-secondary-400 text-sm md:text-md text-center pt-6'>
                        Nous n'avons trouvé aucun élément.
                      </div>
                    </td>
                  </tr>
                )
                  // ? AFFICHAGE 
                  : (
                    data.map((item, index) => (
                      <tr
                        key={index}
                        className={clsx({ 'cursor-pointer': onRowClick }, `border-b hover:bg-secondary-50 w-max`)}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          onRowClick?.(item);
                        }}
                        onContextMenu={(e) => handleRightClick(e, item)}
                      >
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="py-3 px-4 text-secondary-900 truncate max-w-80 text-sm md:text-md "
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

                                  // ? Pas de permission de modification
                                  if (action.type === 'update' && !permission.update) return;
                                  // ! Pas de permission de suppression 
                                  if (action.type === 'delete' && !permission.delete) return;

                                  return (
                                    <button
                                      key={actionIndex}
                                      onClick={() => action.onClick(item)}
                                      className={`p-1 rounded hover:bg-secondary-100 ${getActionColor(action.color)}`}
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

      {/* Menu contextuel */}
      <RightClickMenu
        actions={getRightClickActions()}
        positionX={rightClickMenu.x}
        positionY={rightClickMenu.y}
        isOpen={rightClickMenu.isOpen}
        onClose={closeRightClickMenu}
        idModule={idModule}
      />

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Informations sur les éléments */}
          <div className="text-sm text-secondary-600">
            {pagination.total} éléments
          </div>

          <div className="flex items-center space-x-1">
            {/* Bouton précédent */}
            <button
              type="button"
              onClick={() => handlePageChange(pagination.page - 1 , pagination.search )}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary-50 hover:border-primary-300 transition-colors"
              aria-label="Page précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Numéros de page avec logique de troncature */}
            {(() => {
              const pages = [];
              const currentPage = pagination.page;
              const totalPages = pagination.total_pages;

              if (totalPages <= 7) {
                // Afficher toutes les pages si peu nombreuses
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Logique de troncature pour beaucoup de pages
                pages.push(1);

                if (currentPage > 4) {
                  pages.push('...');
                }

                let start = Math.max(2, currentPage - 1);
                let end = Math.min(totalPages - 1, currentPage + 1);

                // Ajuster pour garder un nombre cohérent de pages
                if (currentPage <= 4) {
                  end = 5;
                }
                if (currentPage >= totalPages - 3) {
                  start = totalPages - 4;
                }

                for (let i = start; i <= end; i++) {
                  if (i > 1 && i < totalPages) {
                    pages.push(i);
                  }
                }

                if (currentPage < totalPages - 3) {
                  pages.push('...');
                }

                pages.push(totalPages);
              }

              return pages.map((page, index) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-3 py-1 text-gray-400"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number , pagination.search )}
                    className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center ${pagination.page === page
                      ? "bg-primary-600 text-white shadow-sm"
                      : "border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300"
                      }`}
                    type="button"
                    aria-current={pagination.page === page ? "page" : undefined}
                  >
                    {paginationLoading && newPage == page ? <div className="w-5 h-5 inline-block border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                      : page
                    }
                  </button>
                );
              });
            })()}

            {/* Bouton suivant */}
            <button
              onClick={() => handlePageChange(pagination.page + 1 , pagination.search )}
              disabled={pagination.page === pagination.total_pages}
              type="button"
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary-50 hover:border-primary-300 transition-colors"
              aria-label="Page suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;