import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
          onClick={onClose}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 w-full m-auto max-h-[calc(100vh-100px)] max-w-[calc(100%-500px)] overflow-x-hidden overflow-y-auto ${
              isOpen ? 'scale-100' : 'scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
