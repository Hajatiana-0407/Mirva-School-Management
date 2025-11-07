// import React from 'react'

import useForm from "../../Hooks/useForm"
import { object, string } from "yup"
import { GraduationCap, Lock, LogIn, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../Redux/store"
import { getAuthState } from "./redux/AuthSlice"
import { getSchoolState } from "../Settings/School/redux/SchoolSlice"
import { loginUser } from "./redux/AuthAsyncThunk"
import InputError from "../../Components/ui/InputError"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getSchoolInfo } from "../Settings/School/redux/SchoolAsyncThunk"
import Loading from "../../Components/ui/Loading"

export const LoginSchema = object({
    identifiant: string()
        .required("L'identifiant est requis"),

    password: string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .required("Le mot de passe est requis"),
});

const Signin = () => {

    const dispatch: AppDispatch = useDispatch();
    const { error, action, datas } = useSelector(getAuthState);
    const { datas: school, action: schoolAction } = useSelector(getSchoolState)
    const navigate = useNavigate();

    const { formErrors, onSubmite } = useForm(LoginSchema, {
        identifiant: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            dispatch(loginUser(validateData));
        }, e);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (datas.isLoggedIn && !!token) {
            navigate('/dashboard');
        }

    }, [datas.isLoggedIn, action.isLoading]);

    useEffect(() => {
        if (!datas.isLoggedIn && !school?.id_etablissement) {
            dispatch(getSchoolInfo());
        }
    }, [datas.isLoggedIn])

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center px-4">
            {schoolAction.isLoading ? <Loading /> :
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 relative border-ring border">
                    <div className="text-center mb-8">
                        <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-600">Connexion</h1>
                        <p className="text-gray-600 mt-2"> {school.nom && school.nom} {school.adresse && "- " + school.adresse}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Idetifiant :
                            </label>
                            <div className="relative">
                                <User className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
                                <input
                                    type="text"
                                    id="identifiant"
                                    name="identifiant"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Entrez votre nom d'utilisateur"
                                />
                            </div>
                            <InputError message={formErrors?.identifiant} />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe :
                            </label>
                            <div className="relative">
                                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Entrez votre mot de passe"
                                />
                            </div>
                            <InputError message={formErrors?.password} />
                            <InputError message={error} />
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex justify-center items-center space-x-2">
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
            }
        </div>
    )
}
export default Signin