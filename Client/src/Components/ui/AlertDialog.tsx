import React from 'react';
import { Check, MessageCircleWarning } from 'lucide-react';

interface AlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
    isOpen,
    onClose,
    title,
    message
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Dialog */}
                <div className="bg-light mx-auto space-y-3 rounded px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-4">
                    <div className="flex items-center  space-x-3 border-b-2">
                        <div className="">
                            <MessageCircleWarning className="w-20 h-20 text-orange-500" />
                        </div>
                        <div className='flex flex-col justify-center  '>
                            <div>
                                <h3 className="text-md font-semibold text-secondary-900">{title}</h3>
                            </div>
                            <div className="">
                                <p className="text-sm text-secondary-600">{message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-3 py-1 text-light bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <Check className='w-5 h-5 inline-block me-1' />
                            D'accord
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog;