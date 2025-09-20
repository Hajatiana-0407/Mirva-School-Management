import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff, AlertCircle, LucideProps, X } from "lucide-react";

interface InputProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: "text" | "password" | "email" | "number" | "date" | "select" | "file";
    icon?: React.ComponentType<LucideProps>;
    value?: string | number;
    readonly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errorMessage?: string;
    defaultValue?: string | number | readonly string[] | undefined;
    iconColor?: string;
    options?: { value: string | number; label: string }[]; // Ajout pour select
}

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
    (
        {
            label,
            name,
            placeholder = "",
            required = false,
            type = "text",
            icon,
            value,
            readonly = false,
            onChange = () => { },
            errorMessage = "",
            defaultValue = undefined,
            iconColor = "text-gray-800",
            options = []
        },
        ref
    ) => {

        const [showPassWord, setShowPassWord] = useState(false);
        const inputType = type !== "password" ? type : showPassWord ? "text" : "password";
        const [fileInputName, setFileInputName] = useState('')
        const [isEmpty, setIsEmpty] = useState(!!defaultValue);
        const inputFileRef = React.useRef<HTMLInputElement>(null);


        const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            if (e.target.value) {
                setIsEmpty(true);
            } else {
                setIsEmpty(false);
            }
            onChange(e);
        }

        return (
            <div>
                {/* Si pas d'icône, afficher le label */}
                {!icon && (
                    <label
                        htmlFor={name}
                        className="block mb-2 text-base text-body text-secondary"
                    >
                        {label} :
                    </label>
                )}

                <div className="relative">
                    {/* Labele du haut */}
                    <span
                        className={clsx({
                            'hidden transition-all duration-700': (!isEmpty || !icon) && type !== 'date',

                        }, "transition-all duration-700 absolute left-3  top-0 -translate-y-1/2 text-sm text-blue-400 pointer-events-none bg-white z-20")}
                    >
                        {label}
                    </span>

                    {/* TYPE SELECT */}
                    {type === "select" ? (
                        <select
                            key={"selection-option"}
                            id={name}
                            name={name}
                            required={required}
                            value={value}
                            onChange={onInputChange}
                            defaultValue={defaultValue}
                            className={clsx(
                                {
                                    "ps-12": icon,
                                    'text-gray-400/60': options.length === 0,
                                },

                                "bg-white border border-gray-300 text-primary text-sm rounded focus:ring-gray-300/50 focus:border-gray-300/50 focus:outline-1 block w-full p-2 py-2.5"
                            )}
                        >
                            {options.map((opt, idx) => (
                                <option key={idx} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}

                            {options.length === 0 &&
                                <option value="" >
                                    Aucun élément trouvé ...
                                </option>}
                        </select>

                    ) : type !== 'file' ? (
                        <input
                            ref={ref as React.Ref<HTMLInputElement>}
                            autoComplete="off"
                            type={inputType}
                            id={name}
                            className={clsx(
                                {
                                    "ps-12": icon,
                                },
                                "bg-background border border-gray-300 text-primary text-sm rounded focus:ring-gray-300/50 focus:border-gray-300/50 focus:outline-1 block w-full p-2 py-2.5"
                            )}
                            name={name}
                            placeholder={placeholder || label }
                            required={required}
                            value={value}
                            onChange={onInputChange}
                            readOnly={readonly}
                            defaultValue={defaultValue}
                        />
                    ) : ""}


                    {icon && (
                        <div className={`absolute flex justify-center items-center w-10 top-0 left-0 text-xl  border-r border-gray-300 h-full `}>
                            {React.createElement(icon, { size: 18, className: iconColor })}
                        </div>
                    )}
                    {/* TYPE  PASSWORD  */}
                    {type === "password" && (
                        <div className="absolute z-20 flex justify-center items-center w-10 top-0 right-0 text-xl text-secondary border-r border-gray-300 h-full">
                            <span
                                className="cursor-pointer"
                                onClick={() => setShowPassWord((v) => !v)}
                            >
                                {!showPassWord ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </div>
                    )}

                    {/* TYPE FILE  */}
                    {type === 'file' &&
                        <div className="flex w-full abso flex-col items-start gap-2 relative">
                            <label className={clsx({}, "flex w-full items-center gap-2 px-4 py-2  border border-gray-400/60 rounded-lg cursor-pointer transition-colors")} >
                                <div className={'w-5 h-5'} />
                                <span className={clsx({
                                    'text-gray-400': !fileInputName,
                                    'text-gray-800': fileInputName,
                                }, 'text-sm')}>
                                    {fileInputName ? fileInputName : label}
                                </span>
                                <input
                                    ref={inputFileRef}
                                    name={name}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setFileInputName(file ? file.name : "");
                                        onInputChange(e);
                                    }}
                                />
                            </label>
                            <span
                                className={clsx({
                                    'hidden': !fileInputName,
                                }, 'absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-400 bg-gray-50 rounded cursor-pointer border')}
                                onClick={(e) => {
                                    e.stopPropagation(); // empêche l'ouverture du file picker
                                    setFileInputName(""); // supprime le nom affiché
                                    if (inputFileRef.current) {
                                        inputFileRef.current.value = ""; // réinitialise l'input file
                                    }
                                }}
                            >
                                <X className="" />
                            </span>
                        </div>
                    }
                </div>

                {errorMessage && (
                    <div className="text-red-500 px-1 p-[2px] mt-1 rounded text-sm bg-red-500/10 flex items-center">
                        <AlertCircle className="inline-block mr-1" size={18} />
                        <span>{errorMessage}</span>
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
