import React from 'react';
import '../css/Modal.css';



function Modal({ isOpen, onClose, children }) {
    console.log("Modal render, isOpen:", isOpen);
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
