import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type DownloadProgressionType = {
    percent: number;
    showProgress: boolean;
    handleClose: () => void,
    Icon: React.ComponentType<{ className?: string }>
    color: string
}
const DownloadProgression: React.FC<DownloadProgressionType> = ({ percent = 0, showProgress, handleClose, color, Icon }) => {
    const [isShow, setIsShow] = useState(showProgress);
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        if (percent === 100) {
            setTimeout(() => setIsShow(false), 1000);
            handleClose();
        }
        setPercentage(percent);
        return () => { }
    }, [percent])

    useEffect(() => {
        setIsShow(showProgress);
        return () => { }
    }, [showProgress])


    if (!isShow) return '';
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
                ></div>

                {/* Dialog */}
                <div className="bg-white mx-auto space-y-3 rounded px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-4">
                    <div className="flex items-center space-x-3">
                        <div className="">
                            <Icon className={`w-10 h-10 text-${color}-600`} />
                        </div>
                        <div className='flex flex-col justify-center flex-1'>
                            <div>
                                <h3 className="text-md italic font-semibold text-gray-600">Préparation du téléchargement...</h3>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full">
                                <div
                                    className={`bg-${color}-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all`}
                                    style={{
                                        width: `${percent}%`
                                    }}
                                >{percentage != 0 ? `${percent}%` : ''}</div>
                            </div>
                        </div>
                        <div>
                            <span
                                className="absolute right-1 top-1 text-sm text-red-400 bg-gray-50 rounded cursor-pointer border"
                                onClick={() => {
                                    setIsShow(false)
                                    handleClose()
                                }}
                            >
                                <X />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DownloadProgression