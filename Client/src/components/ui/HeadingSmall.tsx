import React from 'react'

type HeadingSmallPropsType = {
    title: string
}
const HeadingSmall: React.FC<HeadingSmallPropsType> = ({ title }) => {
    return (
        <div>
            <h2 className=' text-md col-span-2 text-gray-500 italic'>{title}</h2>
        </div>
    )
}
export default HeadingSmall