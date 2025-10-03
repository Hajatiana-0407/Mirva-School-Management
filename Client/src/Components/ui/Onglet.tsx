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
            <div className="border-b border-blue-300">
                <nav className="flex gap-1">
                    {onlgets.map((ongle) => (
                        <div
                            key={ongle.key + '_btn'}
                            onClick={() => setActiveTab(ongle.key.toLowerCase())}
                            className={`py-2 relative cursor-pointer px-2 rounded-t  font-medium text-sm  ${activeTab === ongle.key.toLowerCase()
                                ? 'border-blue-300 border border-b-0  text-blue-600'
                                : 'border-gray-200 border border-b-0 text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {ongle.key}
                             {activeTab === ongle.key.toLowerCase() && 
                             <div className='absolute -bottom-1 left-0 right-0 h-1 bg-white '>
                             </div>
                             }
                        </div>
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