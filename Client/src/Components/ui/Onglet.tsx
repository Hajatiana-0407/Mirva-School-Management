import clsx from 'clsx';
import React, { type ComponentType, type SVGProps, useEffect, useState } from 'react'

type OngletPropsType = {
    onlgets: { key: string, component: JSX.Element, Icon?: ComponentType<SVGProps<SVGSVGElement>>, color?: string }[];
    type?: 'hidden' | 'delete'
    active?: number;
    setActive?: React.Dispatch<React.SetStateAction<number>>;
}
const Onglet: React.FC<OngletPropsType> = ({ onlgets, type = 'hidden', active, setActive }) => {
    const [activeTab, setActiveTab] = useState(active || 1);
    useEffect(() => {
        if (active !== 0 && active) {
            onlgets.map((onglet, idx) => {
                if ((idx + 1) === active && onglet) {
                    setActiveTab(idx + 1)
                    setActive?.(idx + 1)
                }
            })
        }
    }, [active])
    return (
        <div className="shadow-sm space-y-6">
            <div className="bg-white rounded-md shadow-sm border py-3 px-6">
                <nav className="flex space-x-2 overflow-x-auto">
                    {onlgets.map((tab, idx) => {
                        const Icon = tab.Icon;
                        const color = tab?.color ? tab.color as string : 'blue';
                        return (
                            <button
                                type='button'
                                key={tab.key + '_btn'}
                                onClick={() => {
                                    setActiveTab(idx + 1);
                                    setActive?.(idx + 1)
                                }}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap ${activeTab === (idx + 1)
                                    ? `bg-${color}-50 text-${color}-700 shadow-sm`
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {Icon && < Icon className="w-5 h-5" />}
                                <span>{tab.key}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="">
                {onlgets.map((onglet, idx) => {
                    const isActive = activeTab === (idx + 1);
                    if (type === 'hidden') {
                        return (
                            <div
                                key={onglet.key + '_container'}
                                className={clsx({ hidden: !isActive })}
                            >
                                {onglet.component}
                            </div>
                        );
                    }
                    if (type === 'delete' && isActive) {
                        return (
                            <div key={onglet.key + '_container'}>
                                {onglet.component}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

        </div >
    )
}

export default Onglet