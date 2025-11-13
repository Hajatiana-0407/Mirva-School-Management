import React, { useEffect, useState } from 'react';

type CheckInputPropsType = {
    label?: string;
    description?: string;
    name: string;
    defaultValue?: boolean;
    color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
    dependOn?: any
};

const colorClasses = {
    blue: {
        container: 'bg-blue-50/50 ',
        ring: 'peer-focus:ring-blue-300',
        active: 'peer-checked:bg-blue-600',
    },
    red: {
        container: 'bg-red-50/50 ',
        ring: 'peer-focus:ring-red-300',
        active: 'peer-checked:bg-red-600',
    },
    green: {
        container: 'bg-green-50/50 ',
        ring: 'peer-focus:ring-green-300',
        active: 'peer-checked:bg-green-600',
    },
    yellow: {
        container: 'bg-yellow-50/50 ',
        ring: 'peer-focus:ring-yellow-300',
        active: 'peer-checked:bg-yellow-600',
    },
    purple: {
        container: 'bg-purple-50/50  ',
        ring: 'peer-focus:ring-purple-300',
        active: 'peer-checked:bg-purple-600',
    },
};

const CheckInput: React.FC<CheckInputPropsType> = ({
    defaultValue = false,
    label,
    name,
    description,
    color = 'blue',
    dependOn
}) => {
    const [isCheck, setIsCheck] = useState(defaultValue);
    const c = colorClasses[color] || colorClasses.blue;

    useEffect(() => {
        setIsCheck(dependOn);
    }, [dependOn])


    return (
        <label
            className={`flex items-center justify-between w-full p-2 cursor-pointer border rounded ${c.container}`}
        >
            {label &&
                <div>
                    <h4 className="font-medium text-gray-900">{label}</h4>
                    {description && <p className="text-sm text-gray-600">{description}</p>}
                </div>
            }
            <div className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => setIsCheck(e.target.checked)}
                    defaultChecked={isCheck}
                    value={isCheck ? '1' : '0'}
                    name={name}
                    checked={isCheck}
                />
                <div
                    className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full
            after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full
            after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full
            peer-checked:after:border-white ${c.ring} ${c.active}`}
                ></div>
            </div>
        </label>
    );
};

export default CheckInput;
