import clsx from 'clsx';
import React, { useEffect, useState } from 'react'

type OngletPropsType = {
    onlgets: { key: string, component: JSX.Element }[]
}
const Onglet: React.FC<OngletPropsType> = ({ onlgets }) => {
    const [activeTab, setActiveTab] = useState('');
    useEffect(() => {
        if (onlgets[0]) {
            setActiveTab(onlgets[0].key.toLowerCase());
        }
    }, [])
    return (
        <div>
            <div className="border-b">
                <nav className="flex space-x-8">
                    {onlgets.map((ongle) => (
                        <button
                            key={ongle.key + '_btn'}
                            onClick={() => setActiveTab(ongle.key.toLowerCase())}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === ongle.key.toLowerCase()
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {ongle.key}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Composant */}
            <div className='py-4'>
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
        </div>
    )
}

export default Onglet