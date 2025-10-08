import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthState } from "../Pages/Auth/redux/AuthSlice";

export default function ProtectedRoute() {
    const { datas } = useSelector(getAuthState);

    if (!datas.isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }
    return <Outlet/>;
}
