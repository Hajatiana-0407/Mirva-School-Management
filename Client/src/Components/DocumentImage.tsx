import clsx from "clsx"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const DocumentImage = ({ url = '', label = 'photo' }: { url: string, label?: string }) => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div className={clsx({
            'h-[5rem]': !isShow
        }, "w-full p-3 md:p-6 border rounded bg-primary-100  relative overflow-hidden transition-all duration-700")} >
            <a href={url} target="_blank" className="absolute top-2 left-4 italic px-3 md:px-6 font-bold rounded-full bg-primary-600 text-light hover:underline cursor-pointer"> {label} </a>
            <button
                className="absolute top-2 right-4 italic px-4 border border-primary-600 rounded-full bg-primary-600 text-light hover:bg-primary-500 translate-all duration-150 cursor-pointer"
                onClick={() => setIsShow(v => !v)}
            >
                {isShow ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div className={clsx({
                'h-[2rem] overflow-hidden': !isShow,
                'overflow-auto': isShow,
            }, "w-full max-h-max border")} >
                <img src={url} className="w-full mx-auto" alt={label} />
            </div>
        </div>
    )
}

export default DocumentImage; 