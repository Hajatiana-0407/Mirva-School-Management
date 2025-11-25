import React, { useEffect, useState, RefObject } from "react";
import ReactDOM from "react-dom";

interface TooltipPortalProps {
    targetRef: RefObject<HTMLElement>;
    label: string;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ targetRef, label }) => {
    const [pos, setPos] = useState<{ top: number; left: number; visible: boolean }>({
        top: 0,
        left: 0,
        visible: false,
    });

    useEffect(() => {
        const handleEnter = () => {
            const el = targetRef.current;
            if (el) {
                const rect = el.getBoundingClientRect();
                setPos({
                    top: rect.top + rect.height / 2,
                    left: rect.right + 10,
                    visible: true,
                });
            }
        };

        const handleLeave = () => setPos((prev) => ({ ...prev, visible: false }));

        const el = targetRef.current;
        if (el) {
            el.addEventListener("mouseenter", handleEnter);
            el.addEventListener("mouseleave", handleLeave);
        }

        return () => {
            if (el) {
                el.removeEventListener("mouseenter", handleEnter);
                el.removeEventListener("mouseleave", handleLeave);
            }
        };
    }, [targetRef]);

    if (!pos.visible) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed bg-secondary-800 text-light text-sm rounded px-2 py-1 shadow-lg z-[9999] lightspace-nowrap pointer-events-none transition-opacity duration-200"
            style={{
                top: `${pos.top}px`,
                left: `${pos.left}px`,
                transform: "translateY(-50%)",
            }}
        >
            {label}
        </div>,
        document.body
    );
};

export default TooltipPortal;