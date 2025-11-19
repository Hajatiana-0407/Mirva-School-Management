import { ArrowLeft } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

type TitleProps = PropsWithChildren & {
    title: string;
    description?: string;
    backButton?: boolean;
    onBackClick?: () => void;
    fixed?: boolean; // Nouvelle prop pour la fixation
};

const Title: React.FC<TitleProps> = ({
    children,
    title,
    description,
    backButton = true,
    onBackClick,
    fixed = false // Valeur par défaut false
}) => {
    const navigate = useNavigate();

    const handleBackClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (onBackClick) {
            // Utiliser la fonction personnalisée si fournie
            onBackClick();
        } else {
            // Comportement par défaut
            navigate(-1);
        }
    };

    return (
        <div className={`${fixed ? 'sticky top-0 z-40 bg-secondary-50' : 'mb-6 md:mb-6'}`}>
            {/* Div pour cacher le petite apercu en haut du titre  */}
            {fixed &&
                <div className="bg-gray-50 absolute bottom-full left-0 right-0 h-3 md:h-6"></div>
            }
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-1">
                    {backButton &&
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-secondary-700" />
                        </button>
                    }

                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-secondary-900">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-secondary-600 max-sm:hidden mt-1 text-sm md:text-base">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {children && (
                    <div className="flex-shrink-0 flex items-center justify-end gap-2">{children}</div>
                )}
            </div>

            {/* Ligne décorative - Toujours présente */}
            <div className="mt-4 border-b border-secondary-200" />
        </div>
    );
};

export default Title;