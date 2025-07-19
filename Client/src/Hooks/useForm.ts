import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ValidationError, type AnyObjectSchema } from 'yup'
import { AppDispatch } from "../Redux/store";
import { setHiddeModalValue } from "../Redux/AppSlice";


// function to use on the input change event
export default function useForm<T>(schemaValidation: AnyObjectSchema, initial: T  ): {
    formValue: T;
    setFormValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formErrors?: Partial<Record<keyof T, string>>;
    onSubmite: (next: ( data: T) => void, e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleInputFileChange: (e: React.ChangeEvent<HTMLInputElement>) => string | undefined
} {

    const [formValue, setAllFormValue] = useState(initial);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof T, string>>>();
    const dispatch: AppDispatch = useDispatch() ; 

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

    const onSubmite = async (next: ( data: T) => void, e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        dispatch( setHiddeModalValue( false ))  ; 
        e.preventDefault();
        const form = e.currentTarget;

        let data: Record<string, string> = {};
        for (let i = 0; i < form.elements.length; i++) {
            const element = form.elements[i] as HTMLElement;
            if (
                element instanceof HTMLInputElement
                || element instanceof HTMLSelectElement
                || element instanceof HTMLTextAreaElement
            ) {
                const name = element.name;
                const value = element.value;
                if (name) {
                    data[name] = value;
                }
            }
        }

        if ( data ){
            setAllFormValue( data as T ) ; 
        }
        const toastId = toast.loading('Veuillez patienter...');
        try {
            await schemaValidation.validate(data as T, { abortEarly: false })
            setFormErrors({});
            next(data as T);
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

    return {
        formValue,
        setFormValue,
        formErrors,
        onSubmite,
        handleInputFileChange
    }
}