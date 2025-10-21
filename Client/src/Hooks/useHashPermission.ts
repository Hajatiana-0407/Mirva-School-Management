import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getAuthState } from "../Pages/Auth/redux/AuthSlice";
import { navigate } from "../Utils/navigate";

export const useHashPermission = (id?: string, redirect = true): {
    create: boolean;
    read: boolean;
    delete: boolean;
    update: boolean;

    identification: string
} => {
    const { pathname } = useLocation();
    const { datas: { permissions } } = useSelector(getAuthState);
    let identification = '';
    const pathTab = pathname.replace(/^\/+|\/+$/g, "").split('/')
    identification = pathTab[0] || '';
    if (!!id) {
        identification = id;
    }

    // ? GERER LA PERMISSION DE LECTURE GLOBALEMENT 
    if (!permissions?.[identification]?.read) {
        if (redirect) {
            localStorage.removeItem('token');
            navigate('/signin')
        }

        return {
            create: !!permissions?.[identification]?.create,
            read: !!permissions?.[identification]?.read,
            delete: !!permissions?.[identification]?.delete,
            update: !!permissions?.[identification]?.update,

            identification: identification,
        };
    }
    return {
        create: !!permissions[identification]?.create,
        read: !!permissions[identification]?.read,
        delete: !!permissions[identification]?.delete,
        update: !!permissions[identification]?.update,

        identification: identification
    }
}