import React from 'react';
import { createPortal } from 'react-dom';

const AlertModal = ({isOpen, message, onClose}) => {
    if (!isOpen) return null;
    const modalRoot = document.getElementById('modal-root') || document.body;
    return createPortal(
        <div className="fixed inset-0 z-100 backdrop-blur-sm bg-black/30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Alert</h2>
            <p className="mb-6">{message}</p>
            <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
            OK
            </button>
        </div>
        </div>,
        modalRoot
    );
};
export default AlertModal;