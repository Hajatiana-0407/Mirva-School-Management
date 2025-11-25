import clsx from "clsx";
import { cloneElement, isValidElement } from "react";

/* Composant InfoBlock modernisé */
type InfoBlockPropsType = {
    icon: React.ReactNode;
    label: React.ReactNode;
    value: React.ReactNode;
    important?: boolean
}

const InfoBlock = ({ icon, label, value, important }: InfoBlockPropsType) => {

    const styledIcon =
        isValidElement(icon) &&
        cloneElement(icon, {
            className: `${icon.props.className || ""} ${important ? "text-light" : ""}`,
        });

    return (

        <div className={clsx({
             'border': important  , 
             }, "flex rounded-lg items-center overflow-hidden hover:shadow-sm transition-all bg-light")} >
            {/* Icône avec fond léger */}
            <div className={clsx({
                ' bg-cyan-500 text-light': important,
                'bg-light border-e border-secondary-50': !important,
            }, "flex items-center justify-center w-12 h-full")}>
                {styledIcon}
            </div>

            {/* Texte */}
            <div className="flex flex-col px-2 py-1 sm:px-4 sm:py-2 _classe">
                <span className="text-xs uppercase tracking-wide text-secondary-500">
                    {label}
                </span>
                <span className="text-md font-semibold text-secondary-800">{value}</span>
            </div>
        </div>
    )
};

export default InfoBlock
