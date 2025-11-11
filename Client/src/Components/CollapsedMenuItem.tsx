import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import TooltipPortal from "./TooltipPortal";

interface CollapsedMenuItemProps {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
}

const CollapsedMenuItem: React.FC<CollapsedMenuItemProps> = ({
    label,
    icon: Icon,
    path,
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
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                    )
                }
            >
                <Icon className="w-5 h-5" />
            </NavLink>

            {/* Tooltip rendu via Portal */}
            <TooltipPortal targetRef={ref} label={label} />
        </li>
    );
};

export default CollapsedMenuItem;
