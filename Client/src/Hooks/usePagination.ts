import { useDispatch } from "react-redux"
import { AppDispatch } from "../Redux/store"
import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { PaginationType } from "../Utils/Types";

type usePaginationType = {
    thunk: AsyncThunk<any, {
        page?: number;
        query?: any;
    }, any>,
    filterThunk?: AsyncThunk<any, {
        page?: number;
        filter?: any
    }, any>,
    pagination: PaginationType
}
export const usePagination = ({
    thunk, filterThunk, pagination
}: usePaginationType) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [newPage, setNewPage] = useState<number | null>(null);

    // Pagination  navigation
    const handlePageChange = (page: number, query?: any) => {
        console.log(pagination.filter);

        if (page != 0) {
            setisLoading(true);
            setNewPage(page);
            if (!!pagination?.filter && !!filterThunk) {
                const formdata = new FormData();
                Object.entries(pagination.filter).forEach(([key, value]) => {
                    formdata.append(key, value);
                });
                dispatch(filterThunk({ page, filter: formdata }))
            } else {
                dispatch(thunk({ page, query }))
            }
        }
    }

    // Recherche avec pagination 
    const handleSearch = (page: number, search: string) => {
        if (page != 0) {
            setisLoading(true);
            setNewPage(page);
            dispatch(thunk({ page, query: search }))
        }
    }

    // fonction pour la reinitialisation 
    const reinitialize = () => {
        dispatch(thunk({ page: 1 }))
    }

    // Pagination avec le filtre 
    const handleFilterPaginate = () => {

    }

    useEffect(() => {
        if (newPage == pagination.page) {
            setisLoading(false);
        }
    }, [newPage, pagination.page])

    return {
        handlePageChange,
        handleFilterPaginate,
        handleSearch,
        reinitialize,
        isLoading,
        newPage,
    }
}