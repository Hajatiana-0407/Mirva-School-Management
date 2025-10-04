import clsx from 'clsx';
import React, { type ComponentType, type SVGProps, useEffect, useState } from 'react'

type OngletPropsType = {
    onlgets: { key: string, component: JSX.Element, Icon?: ComponentType<SVGProps<SVGSVGElement>> }[]
}
const Onglet: React.FC<OngletPropsType> = ({ onlgets }) => {
    const [activeTab, setActiveTab] = useState('');
    useEffect(() => {
        if (onlgets[0]) {
            setActiveTab(onlgets[0].key.toLowerCase());
        }
    }, [])
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="border-b">
                <nav className="flex space-x-8 px-6">
                    {onlgets.map((tab) => {
                        const Icon = tab.Icon;
                        return (
                            <button
                                key={tab.key + '_btn'}
                                onClick={() => setActiveTab(tab.key.toLowerCase())}
                                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.key.toLowerCase()
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {Icon && < Icon className="w-4 h-4" />}
                                <span>{tab.key}</span>
                            </button>
                        );
                    })}
                </nav>
            </div >

            <div className="p-6">
                {onlgets.map((onglet) => (
                    <div
                        key={onglet.key + '_container'}
                        className={clsx({
                            'hidden': onglet.key.toLowerCase() !== activeTab
                        })}>
                        {onglet.component}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Onglet