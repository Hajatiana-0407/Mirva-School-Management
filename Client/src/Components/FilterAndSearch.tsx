import { Calendar, ChevronDown, Search, X } from "lucide-react";
import React, { useState } from "react";
import { PaginationType } from "../Utils/Types";
import { usePagination } from "../Hooks/usePagination";
import { AsyncThunk } from "@reduxjs/toolkit";
import Input from "./ui/Input";
import { object } from "yup";
import useForm from "../Hooks/useForm";
import { AppDispatch } from "../Redux/store";
import { useDispatch } from "react-redux";

// ----- Types dynamiques pour les filtres avancés -----
type AdvancedFilterField = {
    type: "text" | "select" | "date";
    name: string;
    label: string;
    options?: { label: string, value: number }[];
};

export type FilterAndSearchType = {
    pagination: PaginationType;
    thunk: AsyncThunk<any, { page?: number; query?: any; no_pagination?: boolean }, any>;
    filters?: AdvancedFilterField[];
    isAdvanced?: boolean
    filterThunk?: AsyncThunk<any, {
        page?: number;
        filter?: any;
    }, any>;
    onReinitialize?: () => void,
    isLoading?: boolean
};

const formSchema = object({})
const FilterAndSearch: React.FC<FilterAndSearchType> = ({ pagination, thunk, filters = [], isAdvanced = false, filterThunk, isLoading, onReinitialize }) => {
    const { handleSearch, reinitialize } = usePagination({ thunk, pagination, filterThunk });
    const [simpleSearch, setSimpleSearch] = useState("");
    const { onSubmite } = useForm(formSchema, {});
    const dispatch: AppDispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData) => {
            if (filterThunk) {
                dispatch(filterThunk({ page: pagination.page, filter: validateData }))
            }
        }, e);
    }

    console.log('Filter : '  , isLoading);
    


    const handleReinitialize = () => {
        onReinitialize?.();
        reinitialize();
    }

    return (
        <div className="w-full">
            {/* ------ MODE SIMPLE ------ */}
            {!isAdvanced && (
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={simpleSearch}
                            onChange={(e) => setSimpleSearch(e.target.value)}
                            placeholder="Rechercher..."
                            className="w-full pl-11 pr-4 py-2 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors duration-200"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && simpleSearch) {
                                    handleSearch(1, simpleSearch);
                                }
                            }}
                        />
                    </div>

                    <button
                        onClick={() => simpleSearch && handleSearch(1, simpleSearch)}
                        disabled={!simpleSearch}
                        className="px-5 py-2 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        Rechercher
                    </button>
                </div>
            )}

            {/* ------ MODE AVANCÉ ------ */}
            {isAdvanced && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Recherche dans form avancé */}
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="query"
                            placeholder="Recherche principale..."
                            className="w-full pl-11 pr-4 py-2 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors duration-200"
                        />
                    </div>

                    {/* Inputs dynamiques */}
                    {filters.length > 0 && (
                        <div className="border-t border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {filters.map((field, i) => {
                                    // On ajoute l'options all
                                    let options: any[] = [];
                                    if (field.type == 'select' && field.options) {
                                        options = field.options;
                                        !options.some(option => option.label == 'Tous') ?
                                            options.unshift({ label: 'Tous', value: 0 }) : '';
                                    }
                                    return (
                                        <div key={i} className="flex flex-col">
                                            {/* TEXT */}
                                            {field.type === "text" && (
                                                <Input
                                                    label={field.label}
                                                    name={field.name}
                                                    icon={Search}
                                                    type="text"
                                                />
                                            )}

                                            {/* SELECT */}
                                            {field.type === "select" && (
                                                <Input
                                                    label={field.label}
                                                    name={field.name}
                                                    icon={ChevronDown}
                                                    type="select"
                                                    options={options}
                                                />
                                            )}

                                            {/* DATE */}
                                            {field.type === "date" && (
                                                <Input
                                                    label={field.label}
                                                    name={field.name}
                                                    icon={Calendar}
                                                    type="date"

                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Boutons */}
                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleReinitialize}
                            className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
                        >
                            <X className="w-4 h-4" />
                            <span className="font-medium">Réinitialiser</span>
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2.5 relative bg-secondary-900 text-white hover:bg-secondary-700 transition-colors duration-200 font-medium"
                            disabled={isLoading}
                        >
                            {isLoading &&
                                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-secondary-100/50 backdrop-blur-[0.8px] ">
                                    <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            }
                            Appliquer les filtres
                        </button>
                    </div>
                </form>
            )}

        </div>
    );
};

export default FilterAndSearch;