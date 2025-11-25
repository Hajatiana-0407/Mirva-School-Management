import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import TooltipPortal from "./TooltipPortal";

interface CollapsedMenuItemProps {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
    color?: string
}

const CollapsedMenuItem: React.FC<CollapsedMenuItemProps> = ({
    label,
    icon: Icon,
    path,
    color
}) => {
    const ref = useRef<HTMLAnchorElement | null>(null);

    return (
        <li className="relative">
            <NavLink
                ref={ref}
                to={path}
                title={label}
                className={({ isActive }: { isActive: boolean }) =>
                    clsx(
                        "justify-center w-full flex items-center py-3 text-left transition-colors group relative",
                        isActive
                            ? "bg-primary-50 text-primary-700 border-r-2 border-primary-700"
                            : "text-secondary-700 hover:bg-secondary-50"
                    )
                }
            >
                <Icon className={clsx(`${color} w-5 h-5`)} />
            </NavLink>

            {/* Tooltip rendu via Portal */}
            <TooltipPortal targetRef={ref} label={label} />
        </li>
    );
};

export default CollapsedMenuItem;
