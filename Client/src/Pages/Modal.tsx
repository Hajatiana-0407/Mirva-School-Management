import React, { useEffect } from 'react';
import { Bookmark, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'md' | 'lg'; // 'md' par défaut, 'lg' = modal plus large
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Détermine la largeur du modal selon la prop size
  const sizeClass = size === 'lg'
    ? 'w-full sm:max-w-3xl md:max-w-4xl lg:max-w-7xl'
    : 'w-full sm:max-w-lg';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px]  transition-opacity"
        ></div>

        {/* Modal */}
        <div className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-3 md:p-6 ${sizeClass}`}>
          <div className="flex items-center text-xl  mb-4 sm:text-2xl md:text-3xl font-semibold border-b-2 pb-2 border-gray-300">
            <div className='flex items-center gap-2 mr-auto'>
              <Bookmark className='h-5 w-5 sm:h-6 sm:w-6  md:h-7 md:w-7' />
              <h3 className="text-gray-900">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors border rounded"
            >
              <X className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;