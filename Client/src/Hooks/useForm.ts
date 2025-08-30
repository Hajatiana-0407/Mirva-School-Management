import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ValidationError, type AnyObjectSchema } from 'yup'
import { AppDispatch } from "../Redux/store";
import { setHiddeModalValue } from "../Redux/AppSlice";


/**
 * Fonction pour les formlaire 
 * @param schemaValidation 
 * @param initial 
 * @returns 
 */
export default function useForm<T>(schemaValidation: AnyObjectSchema, initial: T): {
    formValue: T;
    setFormValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formErrors?: Partial<Record<keyof T, string>>;
    onSubmite: (next: (data: T) => void, e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleInputFileChange: (e: React.ChangeEvent<HTMLInputElement>) => string | undefined;
    resetError: () => void ; 
    forceError: (errors: Partial<Record<keyof T, string>>) => void  
} {

    const [formValue, setAllFormValue] = useState(initial);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof T, string>>>();
    const dispatch: AppDispatch = useDispatch();

    const setFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        if (name) {
            setAllFormValue({
                ...formValue,
                [name]: value
            });
        }
    }

    // ************************* Type file  ************************* //
    const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>): string | undefined => {
        if (e.target.type === 'file') {
            const file = e.target.files?.[0];
            const name = e.target.name
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setAllFormValue({
                    ...formValue,
                    [name]: imageUrl
                });
            }
        }
        return
    }

    const onSubmite = async (next: (data: T) => void, e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        dispatch(setHiddeModalValue(false));
        e.preventDefault();
        const form = e.currentTarget;

        const formData = new FormData();
        let data: Record<string, any> = {};
        for (let i = 0; i < form.elements.length; i++) {
            const element = form.elements[i] as HTMLElement;
            if (
                element instanceof HTMLInputElement
                || element instanceof HTMLSelectElement
                || element instanceof HTMLTextAreaElement
            ) {
                const name = element.name;
                if (!name) continue;
                if (element instanceof HTMLInputElement && element.type === 'file') {
                    if (element.files) {
                        if (element.multiple) {
                            for (let j = 0; j < element.files.length; j++) {
                                formData.append(name, element.files[j]);
                            }
                        } else if (element.files[0]) {
                            formData.append(name, element.files[0]);
                        }
                    }
                } else if (element instanceof HTMLInputElement && element.type === 'radio') {
                    if (element.checked) {
                        data[name] = element.value;
                        formData.append(name, element.value)
                    }
                } else {
                    formData.append(name, element.value);
                    data[name] = element.value;
                }
            }
        }

        if (data) {
            setAllFormValue(data as T);
        }
        const toastId = toast.loading('Veuillez patienter...');
        try {
            await schemaValidation.validate(data as T, { abortEarly: false })
            setFormErrors({});
            next(formData as any);
            toast.dismiss(toastId);
        } catch (error) {
            const errors: Partial<Record<keyof T, string>> = {};
            if (error instanceof ValidationError) {
                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path as keyof T] = err.message;
                    }
                });
                setFormErrors(errors);
            }
            toast.dismiss(toastId);
        }
    }

    // Effacer toutes les erreur 
    const resetError = () => {
        setFormErrors({});
    }

    // Forcer les erreurs 
    const forceError = (errors: Partial<Record<keyof T, string>>) => {
        setFormErrors(errors);
    }



    return {
        formValue,
        setFormValue,
        formErrors,
        onSubmite,
        handleInputFileChange,
        resetError , 
        forceError
    }
}