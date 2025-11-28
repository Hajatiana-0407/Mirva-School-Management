import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useHashPermission } from '../Hooks/useHashPermission';

export interface Action {
    label: string;
    onClick: () => void;
    danger?: boolean;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    type?: string;
}

interface Props {
    actions: Action[];
    positionX?: number;
    positionY?: number;
    idModule?: string;
    isOpen: boolean;
    onClose: () => void;
}

const RightClickMenu = ({ actions, positionX, positionY, idModule, isOpen, onClose }: Props) => {
    const permission = useHashPermission({ id: idModule });
    const menuRef = useRef<HTMLDivElement>(null);

    // Fermer le menu quand on clique ailleurs
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Empêcher le menu contextuel par défaut sur le menu lui-même
    const handleMenuContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={menuRef}
            style={{
                position: "fixed",
                top: positionY ? positionY - 10 : 0,
                left: positionX ? positionX + 10 : 0,
                zIndex: 9999,
            }}
            onContextMenu={handleMenuContextMenu}
            className="bg-light border border-primary-300/60 rounded rounded-tr-none animate-fade-in"
        >
            <ul className="p-1 space-y-1">
                {actions.map((action, i) => {
                    // Gestion des permissions
                    if (action.type === 'update' && !permission.update) return null;
                    if (action.type === 'delete' && !permission.delete) return null;

                    return (
                        <li key={i}>
                            <button
                                onClick={() => {
                                    action.onClick();
                                    onClose();
                                }}
                                type="button"
                                className={`w-full border border-secondary-100 rounded text-left px-2 py-1 sm:px-4 sm:py-2 _classe text-md hover:bg-secondary-100 flex items-center gap-2 text-ellipsis overflow-hidden lightspace-nowrap  text-secondary-600`}
                            >
                                {action.icon && <action.icon className={`w-5 h-5 ${action.color}`} />}
                                {action.label}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="absolute -top-[2px] right-full w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[15px] border-r-primary-200"></div>
        </div>,
        document.body
    );
};

export default RightClickMenu;