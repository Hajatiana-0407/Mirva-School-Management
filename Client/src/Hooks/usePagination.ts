import { useDispatch } from "react-redux"
import { AppDispatch } from "../Redux/store"
import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

type usePaginationType = {
    thunk: AsyncThunk<any, {
        page?: number;
        query?: any;
    }, any>,
    page: number;
    search?: string
}
export const usePagination = ({
    thunk, page
}: usePaginationType) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [newPage, setNewPage] = useState<number | null>(null);

    // Pagination  navigation
    const handlePageChange = (page: number, query?: any) => {
        if (page != 0) {
            setisLoading(true);
            setNewPage(page);
            dispatch(thunk({ page, query }))
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

    useEffect(() => {
        if (newPage == page) {
            setisLoading(false);
        }
    }, [newPage, page])

    return {
        handlePageChange,
        handleSearch,
        isLoading,
        newPage
    }
}