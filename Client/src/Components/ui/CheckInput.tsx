import React, { useState } from 'react'

type CheckInputPropsType = {
    label: string;
    description?: string;
    name: string;
    defaultValue?: boolean
}
const CheckInput: React.FC<CheckInputPropsType> = ({ defaultValue = false, label, name, description }) => {
    const [isCheck, setIsCheck] = useState(defaultValue);
    return (
        <label
            className="flex items-center justify-between w-full p-2 cursor-pointer bg-blue-50/50 border rounded" 
        >
            <div>
                <h4 className="font-medium text-gray-900">{label}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => setIsCheck(e.target.checked)}
                    defaultChecked={isCheck}
                    value={isCheck ? "1" : "0"}
                    name={name}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
        </label>
    )
}

export default CheckInput