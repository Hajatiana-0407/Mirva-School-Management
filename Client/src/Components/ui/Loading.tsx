import clsx from "clsx";
import React from "react";

type LoadingPropsType = {
    size?: 'lg' | 'md' | 'sm';
    title?: string
};


const Loading: React.FC<LoadingPropsType> = ({ size = 'md', title = '' }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-64 w-full">
            <div className={clsx(
                {
                    "h-14 w-14": size === 'lg',
                    "h-12 w-12": size === 'md',
                    "h-9 w-9": size === 'sm',
                },
                "animate-spin rounded-full  border-b-2 border-primary-600")}
            >
            </div>
            {title &&
                <div className="text-secondary-700">{title}...</div>
            }
        </div>

    )
}

export default Loading