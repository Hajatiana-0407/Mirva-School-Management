import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'
import { PaginationType } from '../Utils/Types';
import { AsyncThunk } from '@reduxjs/toolkit';
import { usePagination } from '../Hooks/usePagination';

type PaginationComponentType = {
    pagination: PaginationType;
    thunk: AsyncThunk<any, {
        page?: number;
        query?: any;
    }, any>
}
const Pagination: React.FC<PaginationComponentType> = ({ pagination, thunk }) => {
    const { handlePageChange, isLoading, newPage } = usePagination({ page: pagination.page, thunk })
    return (
        <>
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
                            onClick={() => handlePageChange(pagination.page - 1, pagination.search)}
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
                                        onClick={() => handlePageChange(page as number, pagination.search)}
                                        className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center ${pagination.page === page
                                            ? "bg-primary-600 text-white shadow-sm"
                                            : "border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300"
                                            }`}
                                        type="button"
                                        aria-current={pagination.page === page ? "page" : undefined}
                                    >
                                        {isLoading && newPage == page ? <div className="w-5 h-5 inline-block border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                            : page
                                        }
                                    </button>
                                );
                            });
                        })()}

                        {/* Bouton suivant */}
                        <button
                            onClick={() => handlePageChange(pagination.page + 1, pagination.search)}
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
        </>
    )
}

export default Pagination