import { useSelector } from "react-redux";
import { getAuthState } from "../Pages/Auth/redux/AuthSlice";

export const useActiveUser = () => {
    const { datas: { user } } = useSelector(getAuthState);
    return {
        isTeacher: user?.role_id?.toLocaleLowerCase() === 'teacher',
        isStudent: user?.role_id?.toLocaleLowerCase() === 'student',
        isParent: user?.role_id?.toLocaleLowerCase() === 'parent',
        isAdmin: user?.role_id?.toLocaleLowerCase() === 'admin',
    }
}