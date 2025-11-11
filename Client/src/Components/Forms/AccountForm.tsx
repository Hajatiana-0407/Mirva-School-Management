import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice'
import Input from '../ui/Input';
import { Check, KeyRound, LockKeyhole, Mail, Save } from 'lucide-react';
import useForm from '../../Hooks/useForm';
import * as Yup from "yup";
import HeadingSmall from '../ui/HeadingSmall';
import { AppDispatch } from '../../Redux/store';
import { updateAccount } from '../../Pages/Auth/redux/AuthAsyncThunk';
import InputError from '../ui/InputError';

export const AccountSchema = Yup.object({
    identifiant: Yup.string()
        .required("L'identifiant est requis"),

    password: Yup.string()
        .required("Le mot de passe est requis"),

    newPassword: Yup.string()
        .notRequired()
        .test(
            "password-strength",
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (ex: Abc123!@)",
            (value) => {
                if (!value || value.trim() === "") return true; // si vide, pas de validation
                const minLength = /.{8,}/.test(value);
                const hasLower = /[a-z]/.test(value);
                const hasUpper = /[A-Z]/.test(value);
                const hasNumber = /\d/.test(value);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                return minLength && hasLower && hasUpper && hasNumber && hasSpecial;
            }
        ),

    confirmPassword: Yup.string().when("newPassword", {
        is: (val: string | undefined) => val && val.trim() !== "",
        then: (schema) =>
            schema
                .required("La confirmation du mot de passe est requise")
                .oneOf([Yup.ref("newPassword")], "Les mots de passe ne correspondent pas"),
        otherwise: (schema) => schema.notRequired(),
    }),
});
const AccountForm: React.FC = () => {
    const { datas, action, error } = useSelector(getAuthState)
    const { formErrors, onSubmite } = useForm(AccountSchema, {
        identifiant: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    })
    const dispatch: AppDispatch = useDispatch();
    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            dispatch(updateAccount(validateData));
        }, e);
    }
    return (
        <form className='space-y-4' onSubmit={handlesubmit}>
            <Input
                label="Identfiiant"
                type="text"
                name="identifiant"
                placeholder="Votre identifiant"
                defaultValue={datas.user?.identifiant as string}
                errorMessage={formErrors?.identifiant}
                icon={Mail}
            />
            <Input
                label="Mot de passe"
                type="password"
                name="password"
                placeholder="votre mot de passe"
                errorMessage={formErrors?.password}
                icon={KeyRound}
            />

            <div>
                <HeadingSmall title='Modification mot de passe :' />
            </div>
            <Input
                label="Nouveau mot de passe"
                type="password"
                name="newPassword"
                placeholder="Nouveau mot de passe"
                errorMessage={formErrors?.newPassword}
                icon={LockKeyhole}
                isShowGeneratePassword
            />
            <div>
                <Input
                    label="Confirmation"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmation du nouveau mot de passe"
                    errorMessage={formErrors?.confirmPassword}
                    icon={Check}
                />
                <InputError message={error} />
            </div>

            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg space-x-2 hover:bg-blue-700 transition-colors flex items-center"
                >
                    {action.isUpdating
                        ? <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <Save className="w-4 h-4" />
                    }
                    <span>Enregistrer</span>
                </button>
            </div>
            <input type="hidden" name='id_user' value={datas.user?.id_user} onChange={() => { }} />
        </form>
    )
}

export default AccountForm