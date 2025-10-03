import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ValidationError, type AnyObjectSchema } from 'yup'
import { AppDispatch } from "../Redux/store";
import { setHiddeModalValue } from "../Redux/AppSlice";
import { nestData } from "../Utils/Utils";

type SchemaInput = AnyObjectSchema | AnyObjectSchema[];

export default function useForm<T>(
    schemaValidation: SchemaInput,
    initial: T
): {
    formValue: T;
    setFormValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formErrors?: Partial<Record<keyof T, string>>;
    onSubmite: (next: (data: T) => void, e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    resetError: () => void;
    forceError: (errors: Partial<Record<keyof T, string>>) => void;
    HandleValidateSchema: (form: HTMLFormElement) => Promise<boolean>
} {
    const [formValue, setAllFormValue] = useState(initial);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof T, string>>>();
    const dispatch: AppDispatch = useDispatch();

    // Extraction des donnée du formulaire 
    const getDataForm = (form?: HTMLFormElement) => {
        const formData = new FormData();
        let data: Record<string, any> = {};
        const leng = form?.elements.length || 0;
        for (let i = 0; i < leng; i++) {
            const element = form?.elements[i] as HTMLElement;
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
                        formData.append(name, element.value);
                    }
                } else {
                    formData.append(name, element.value);
                    data[name] = element.value;
                }
            }
        }

        return {
            formData, data
        }
    }

    // Soumission
    const onSubmite = async (next: (data: T) => void, e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        dispatch(setHiddeModalValue(false));
        e.preventDefault();
        const form = e.currentTarget;
        const { data, formData } = getDataForm(form);
        if (data) {
            setAllFormValue(data as T);
        }

        const toastId = toast.loading('Veuillez patienter...');
        try {
            const schemas = Array.isArray(schemaValidation)
                ? schemaValidation
                : [schemaValidation];

            // Fusion des erreurs de plusieurs schémas
            const allErrors: Partial<Record<keyof T, string>> = {};
            for (const schema of schemas) {
                try {
                    const dataNested = nestData(data);
                    await schema.validate(dataNested as T, { abortEarly: false });
                } catch (error) {
                    if (error instanceof ValidationError) {
                        error.inner.forEach((err) => {
                            if (err.path) {
                                allErrors[err.path as keyof T] = err.message;
                            }
                        });
                    }
                }
            }

            if (Object.keys(allErrors).length > 0) {
                setFormErrors(allErrors);
            } else {
                setFormErrors({});
                next(formData as any);
            }
            toast.dismiss(toastId);
        } catch (error) {
            toast.dismiss(toastId);
        }
    };

    // Seulement pour testé si le schema est valide ( pour des formulaire a plusieur etape )
    const HandleValidateSchema = async (form: HTMLFormElement) => {
        const { data } = getDataForm(form);
        try {
            const schemas = Array.isArray(schemaValidation)
                ? schemaValidation
                : [schemaValidation];

            // Fusion des erreurs de plusieurs schémas
            const allErrors: Partial<Record<keyof T, string>> = {};
            for (const schema of schemas) {
                try {
                    const dataNested = nestData(data);
                    await schema.validate(dataNested as T, { abortEarly: false });
                } catch (error) {
                    if (error instanceof ValidationError) {
                        error.inner.forEach((err) => {
                            if (err.path) {
                                allErrors[err.path as keyof T] = err.message;
                            }
                        });
                    }
                }
            }

            if (Object.keys(allErrors).length > 0) {
                setFormErrors(allErrors);
                return false;
            }
            setFormErrors(undefined);
            return true;
        } catch (error) {
            return false;
        }
    }

    const resetError = () => {
        setFormErrors({});
    };

    const forceError = (errors: Partial<Record<keyof T, string>>) => {
        setFormErrors(errors);
    };




    const setFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        if (name) {
            setAllFormValue({
                ...formValue,
                [name]: value
            });
        }
    };

    return {
        formValue,
        setFormValue,
        formErrors,
        onSubmite,
        resetError,
        forceError,
        HandleValidateSchema
    };
}
