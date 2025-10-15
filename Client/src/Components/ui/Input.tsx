import React, { forwardRef, useState, useRef } from "react";
import clsx from "clsx";
import { Eye, EyeOff, AlertCircle, X, RefreshCcw, LucideProps } from "lucide-react";
import { generatePassword } from "../../Utils/Utils";

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
    defaultValue?: string | number | readonly string[];
    iconColor?: string;
    options?: { value: string | number; label: string }[];
    isShowGeneratePassword?: boolean;
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
            options = [],
            isShowGeneratePassword = false,
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isEmpty, setIsEmpty] = useState(!!defaultValue);
        const [localValue, setLocalValue] = useState(value ?? (defaultValue as string) ?? "");
        const inputFileRef = useRef<HTMLInputElement>(null);
        const [fileInputName, setFileInputName] = useState("");

        const inputType = type !== "password" ? type : showPassword ? "text" : "password";

        // Gestion du changement de valeur
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const val = e.target.value;
            setIsEmpty(!!val);
            setLocalValue(val);
            onChange(e);
        };

        // Génération du mot de passe
        const handleGeneratePassword = () => {
            const password = generatePassword(12);
            setLocalValue(password);
            setShowPassword(true);
            onChange({
                target: { name, value: password },
            } as any);
        };

        return (
            <div className="relative w-full">
                {/* Label */}
                {!icon && (
                    <label htmlFor={name} className="block mb-2 text-base text-body text-secondary">
                        {label} :
                    </label>
                )}

                <div className="relative">
                    {/* Label flottant */}
                    <span
                        className={clsx(
                            {
                                hidden: !isEmpty && type !== "select",
                            },
                            "transition-all duration-700 absolute left-3 top-0 -translate-y-1/2 text-sm text-blue-400 pointer-events-none bg-white z-20"
                        )}
                    >
                        {label}
                    </span>

                    {/* Select */}
                    {type === "select" ? (
                        <select
                            id={name}
                            name={name}
                            required={required}
                            onChange={handleChange}
                            defaultValue={defaultValue}
                            className={clsx(
                                {
                                    "ps-12": icon,
                                    "text-gray-400/60": options.length === 0,
                                },
                                "bg-white border border-gray-300 text-primary text-sm rounded focus:ring-gray-300/50 focus:border-gray-300/50 focus:outline-1 block w-full p-2 py-2.5"
                            )}
                        >
                            {options.length
                                ? options.map((opt, idx) => (
                                    <option key={idx} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))
                                : (
                                    <option value="">Aucun élément trouvé ...</option>
                                )}
                        </select>
                    ) : type === "file" ? (
                        // Input file
                        <div className="flex w-full flex-col items-start gap-2 relative">
                            <label
                                className={clsx(
                                    "flex w-full items-center gap-2 px-4 py-2 border border-gray-400/60 rounded-lg cursor-pointer transition-colors"
                                )}
                            >
                                <div className="w-5 h-5" />
                                <span
                                    className={clsx(
                                        { "text-gray-400": !fileInputName, "text-gray-800": fileInputName },
                                        "text-sm"
                                    )}
                                >
                                    {fileInputName || label}
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
                                        handleChange(e);
                                    }}
                                />
                            </label>
                            {fileInputName && (
                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-400 bg-gray-50 rounded cursor-pointer border"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFileInputName("");
                                        if (inputFileRef.current) inputFileRef.current.value = "";
                                    }}
                                >
                                    <X />
                                </span>
                            )}
                        </div>
                    ) : (
                        // Input classique (text, password, email...)
                        <input
                            ref={ref as React.Ref<HTMLInputElement>}
                            autoComplete="off"
                            type={inputType}
                            id={name}
                            name={name}
                            placeholder={placeholder || label}
                            required={required}
                            value={localValue}
                            onChange={handleChange}
                            readOnly={readonly}
                            className={clsx(
                                { "ps-12": icon },
                                "bg-background border overflow-hidden border-gray-300 text-primary text-sm rounded focus:ring-gray-300/50 focus:border-gray-300/50 focus:outline-1 block w-full p-2 py-2.5"
                            )}
                        />
                    )}

                    {/* Icône */}
                    {icon && (
                        <div className="absolute flex justify-center items-center w-10 top-0 left-0 text-xl border-r border-gray-300 h-full">
                            {React.createElement(icon, { size: 18, className: iconColor })}
                        </div>
                    )}

                    {/* Password actions */}
                    {type === "password" && (
                        <div className="absolute z-20 flex justify-center items-center gap-2 top-0 right-0 text-xl text-secondary h-full rounded overflow-hidden">
                            <span className="cursor-pointer px-2" onClick={() => setShowPassword((v) => !v)}>
                                {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                            {isShowGeneratePassword && (
                                <button
                                    type="button"
                                    className="h-full px-2 flex items-center bg-blue-500 text-white"
                                    onClick={handleGeneratePassword}
                                >
                                    <RefreshCcw />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Erreur */}
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