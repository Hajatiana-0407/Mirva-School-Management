import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonColor?: 'red' | 'blue' | 'green' | 'orange' | 'purple';
  cancelButtonColor?: 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'gray';
  confirmButtonIcon?: React.ComponentType<{ className?: string }>;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  showIcon?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonColor = 'red',
  cancelButtonColor = 'gray',
  confirmButtonIcon = Check,
  confirmButtonLabel = 'Confirmer',
  cancelButtonLabel = 'Annuler',
  showIcon = true,
  icon = AlertTriangle
}) => {
  if (!isOpen) return null;

  const IconComponent = icon;
  const ConfirmIcon = confirmButtonIcon;

  // Couleurs personnalisées pour les boutons de confirmation
  const confirmButtonColors = {
    red: 'text-light bg-red-600 hover:bg-red-700',
    blue: 'text-light bg-blue-600 hover:bg-blue-700',
    green: 'text-light bg-green-600 hover:bg-green-700',
    orange: 'text-light bg-orange-600 hover:bg-orange-700',
    purple: 'text-light bg-purple-600 hover:bg-purple-700',
    gray: 'text-gray-500 bg-gray-50 hover:bg-gray-300 border'
  };

  const iconColors = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600'
  };

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
          <div className="flex items-center space-x-3 border-b-2">
            {showIcon && (
              <div className="">
                <IconComponent className={`w-20 h-20 ${iconColors[confirmButtonColor]}`} />
              </div>
            )}
            <div className='flex flex-col justify-center'>
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
              className={`px-3 py-1  rounded-lg transition-colors flex items-center gap-2 ${confirmButtonColors[cancelButtonColor]}`}
            >
              <X className="w-5 h-5" />
              {cancelButtonLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`px-3 py-1  rounded-lg transition-colors flex items-center gap-2 ${confirmButtonColors[confirmButtonColor]}`}
            >
              <ConfirmIcon className="w-5 h-5" />
              {confirmButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;