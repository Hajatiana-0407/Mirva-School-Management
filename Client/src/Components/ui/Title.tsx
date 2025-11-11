import { ArrowLeft } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

type TitleProps = PropsWithChildren & {
    title: string;
    description?: string;
};

const Title: React.FC<TitleProps> = ({ children, title, description }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-6 md:mb-6 ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-1">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-700" />
                    </button>

                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-gray-600 mt-1 text-sm md:text-base">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {children && (
                    <div className="flex-shrink-0 flex items-center gap-2">{children}</div>
                )}
            </div>

            {/* Ligne décorative */}
            <div className="mt-4 border-b border-gray-200" />
        </div>
    );
};

export default Title;
