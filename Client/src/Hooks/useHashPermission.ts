import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getAuthState } from "../Pages/Auth/redux/AuthSlice";
import { navigate } from "../Utils/navigate";

type HashPermissionPropsType = {
    id?: string;
    redirect?: boolean
}
export const useHashPermission = (props?: HashPermissionPropsType): {
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
    identification = pathTab[0] === 'back-office' ? pathTab[1] || '' : pathTab[0] || '';
    if (!!props?.id) {
        identification = props?.id;
    }
    // ? GERER LA PERMISSION DE LECTURE GLOBALEMENT 
    if (!!permissions[identification] && !permissions[identification].read) {
        if (props?.redirect) {
            localStorage.removeItem('token');
            navigate('/back-office/signin')
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