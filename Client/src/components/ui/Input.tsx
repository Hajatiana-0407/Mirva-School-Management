import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff, AlertCircle, LucideProps } from "lucide-react";

interface InputProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: "text" | "password" | "email" | "number" | "date";
    icon?: React.ComponentType<LucideProps>;
    value?: string | number;
    readonly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    defaultValue?: string | number | readonly string[] | undefined;
    iconColor?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
            onChange,
            errorMessage = "",
            defaultValue = undefined , 
            iconColor = "text-gray-800"
        },
        ref
    ) => {
        const [showPassWord, setShowPassWord] = useState(false);

        const inputType =
            type !== "password" ? type : showPassWord ? "text" : "password";

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
                    {type === "date" && (
                        <span
                            className="absolute left-3  top-0 -translate-y-1/2 text-sm text-gray-600 bg-white pointer-events-none"
                        >
                            {label}
                        </span>
                    )}
                    <input
                        ref={ref}
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
                        placeholder={icon ? label : placeholder}
                        required={required}
                        value={value}
                        onChange={onChange}
                        readOnly={readonly}
                        defaultValue={defaultValue}
                    />

                    {icon && (
                        <div className={`absolute flex justify-center items-center w-10 top-0 left-0 text-xl  border-r border-gray-300 h-full `}>
                            {React.createElement(icon, { size: 18, className:  iconColor })}
                        </div>
                    )}

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
