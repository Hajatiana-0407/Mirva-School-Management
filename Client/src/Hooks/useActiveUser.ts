import { useSelector } from "react-redux";
import { getAuthState } from "../Pages/Auth/redux/AuthSlice";

export const useActiveUser = () => {
    const { datas: { user } } = useSelector(getAuthState);
    return {
        isTeacher : user?.role?.toLocaleLowerCase() === 'enseignant' , 
        isStudent : user?.role?.toLocaleLowerCase() === 'étudiant' , 
        isParent : user?.role?.toLocaleLowerCase() === 'parent' , 
    }
}