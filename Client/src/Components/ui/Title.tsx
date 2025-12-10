import { ArrowLeft, Filter, X } from "lucide-react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterAndSearch, { FilterAndSearchType } from "../FilterAndSearch";
import clsx from "clsx";

type TitleProps = PropsWithChildren & {
    title: string;
    description?: string;
    backButton?: boolean;
    onBackClick?: () => void;
    fixed?: boolean;
    secondaryComponent?: React.ReactNode;
    filter?: FilterAndSearchType
};

const Title: React.FC<TitleProps> = ({
    children,
    title,
    description,
    backButton = true,
    onBackClick,
    fixed = false,
    secondaryComponent,
    filter
}) => {
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate();
    const handleBackClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (onBackClick) {
            onBackClick();
        } else {
            navigate(-1);
        }
    };

    // Fermier le filtre form apres la recherche 
    useEffect(() => {
        if (!filter?.isLoading && showFilter) {
            setShowFilter(false);
        }
        return () => { }
    }, [filter?.isLoading])


    const handleReinitialize = () => {
        setShowFilter(false);
    }
    return (
        <div className={`${fixed ? 'md:sticky top-0 z-40 bg-secondary-50 -left-10' : 'mb-6 md:mb-6'}`}>
            {/* Bandeau masquant */}
            {fixed && (<>
                <div className="bg-gray-50 absolute bottom-full left-0 right-0 h-3 md:h-6"></div>
            </>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                <div className="flex items-start gap-1">
                    {backButton && (
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-secondary-700" />
                        </button>
                    )}

                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-secondary-900">
                            {title}
                        </h1>
                        {description && !showFilter && !secondaryComponent && (
                            <p className="text-secondary-600 max-sm:hidden mt-1 text-sm md:text-base">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Children (boutons à droite) */}
                {children && (
                    <div className="flex-shrink-0 flex items-center justify-end gap-2">
                        {children}
                        {filter &&
                            <button
                                type="button"
                                onClick={() => setShowFilter(v => !v)}
                                className="flex items-center gap-2 bg-secondary-200 border border-secondary-300 rounded-md py-2 px-3 hover:bg-secondary-300 transition-all"
                            >
                                {showFilter ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                                <span className="text-sm">
                                    {showFilter ? "Masquer le filtre" : "Filtre"}
                                </span>
                            </button>
                        }
                    </div>
                )}
            </div>
            <div className="mt-2 space-y-2">
                {filter && <div className={clsx({ 'hidden': !showFilter })}>
                    <FilterAndSearch
                        pagination={filter.pagination}
                        thunk={filter.thunk}
                        filters={filter.filters}
                        isAdvanced={filter.isAdvanced}
                        filterThunk={filter.filterThunk}
                        onReinitialize={handleReinitialize}
                        isLoading={filter.isLoading}
                    />
                </div>
                }

                {/* Nouveau composant secondaire */}
                {secondaryComponent && (
                    <div className="mt-3">
                        {secondaryComponent}
                    </div>
                )}
            </div>
            {/* Ligne décorative */}
            <div className="mt-4 border-b border-secondary-200" />
        </div>
    );
};

export default Title;
