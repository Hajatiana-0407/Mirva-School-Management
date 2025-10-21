import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, testAuthentication } from "../Pages/Auth/redux/AuthSlice";
import { useEffect } from "react";
import { AppDispatch } from "../Redux/store";
import { useHashPermission } from "../Hooks/useHashPermission";

export default function ProtectedRoute() {
    const teste = useHashPermission();
    const { datas } = useSelector(getAuthState);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (datas.isLoggedIn) {
            dispatch(testAuthentication());
        }
        return () => { }
    }, [datas.isLoggedIn])

    const tokken = localStorage.getItem('token')

    if (!datas.isLoggedIn && !tokken) {
        return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
}
