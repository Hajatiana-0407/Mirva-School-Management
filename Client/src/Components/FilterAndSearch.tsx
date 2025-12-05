import { Filter, Search } from 'lucide-react'
import React, { useState } from 'react'
import { PaginationType } from '../Utils/Types'
import { usePagination } from '../Hooks/usePagination'
import { AsyncThunk } from '@reduxjs/toolkit'
type FilterAndSearchType = {
    pagination: PaginationType;
    thunk: AsyncThunk<any, {
        page?: number;
        query?: any;
    }, any>
}


const FilterAndSearch: React.FC<FilterAndSearchType> = ({ pagination, thunk }) => {
    const { handleSearch } = usePagination({ page: pagination.page, thunk, search: pagination.search });
    const [seachValue, setSeachValue] = useState('');
    return (
        <div className="flex items-center justify-between mb-6 md:mb-6">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                    <input
                        type="text"
                        value={seachValue}
                        onChange={(e) => setSeachValue(e.target.value)}
                        placeholder="Rechercher une classe..."
                        className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />

                </div>
                <button
                    className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 _classe border border-secondary-300 rounded-lg hover:bg-secondary-50"
                    onClick={() => { seachValue !== '' ? handleSearch(pagination.page, seachValue) : '' }}
                >
                    <Filter className="w-4 h-4" />
                    <span>Filtres</span>
                </button>
            </div>
        </div>
    )
}

export default FilterAndSearch