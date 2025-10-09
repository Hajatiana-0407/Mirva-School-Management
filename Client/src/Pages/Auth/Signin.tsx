// import React from 'react'

import Input from "../../Components/ui/Input"
import useForm from "../../Hooks/useForm"
import { object, string } from "yup"
import { GraduationCap, ImagePlus, KeyRound, LogIn, Mail } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../Redux/store"
import { getAuthState } from "./redux/AuthSlice"
import { getSchoolState } from "../Settings/School/redux/SchoolSlice"
import { baseUrl } from "../../Utils/Utils"
import { loginUser } from "./redux/AuthAsyncThunk"
import InputError from "../../Components/ui/InputError"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getSchoolInfo } from "../Settings/School/redux/SchoolAsyncThunk"

export const LoginSchema = object({
    email: string()
        .email("Veuillez entrer un email valide")
        .required("L'email est requis"),

    password: string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .required("Le mot de passe est requis"),
});

const Signin = () => {

    const dispatch: AppDispatch = useDispatch();
    const { error, action, datas } = useSelector(getAuthState);
    const { datas: school } = useSelector(getSchoolState)
    const navigate = useNavigate();

    const { formErrors, onSubmite } = useForm(LoginSchema, {
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            dispatch(loginUser(validateData));
        }, e);
    }

    useEffect(() => {
        if (datas.isLoggedIn) {
            navigate('/dashboard');
        }
    }, [datas.isLoggedIn]);

    useEffect(() => {
        if (!datas.isLoggedIn && !school.id_etablissement) {
            dispatch(getSchoolInfo());
        }
    }, [datas.isLoggedIn])

    return (
        <div className="w-screen h-screen pt-[calc(100vh/5)]">
            <div className="relative shadow  p-5 w-[95%] sm:w-96 bg-surface mx-auto border-ring border rounded">
                <div className="flex justify-center items-center p-2 mb-4 rounded-lg mx-auto max-h-24">
                    {school.logo ? <div className="flex justify-center items-center p-2 mb-4 rounded-lg mx-auto max-h-20 border w-full bg-gray-50">
                        <img src={baseUrl(school.logo)} alt="Logo" className="max-h-24 max-w-full object-cover " />
                    </div>
                        : school.nom
                            ? <div className="flex items-center gap-2 text-gray-600 border w-full py-2 justify-center bg-gray-50 rounded">
                                <GraduationCap />
                                <span className="font-semibold text-xl "> {school.nom} </span>
                            </div>
                            : <div className="flex items-center gap-2 text-gray-500 border w-full py-2 justify-center bg-gray-50 rounded">
                                <ImagePlus />
                                <span className="font-semibold text-xl ">Votre logo ici</span>
                            </div>
                    }
                </div>
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 my-2">
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Votre email"
                        errorMessage={formErrors?.email}
                        icon={Mail}
                    />
                    <div>
                        <Input
                            label="Mot de passe"
                            type="password"
                            name="password"
                            placeholder="votre mot de passe"
                            errorMessage={formErrors?.password}
                            icon={KeyRound}
                        />
                        <InputError message={error} />
                    </div>


                    <button type="submit" className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex justify-center items-center space-x-2">
                        {!action.isLoading &&
                            <LogIn className="w-4 h-4" />
                        }
                        {action.isLoading &&
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        }
                        <span>Se connecter</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Signin