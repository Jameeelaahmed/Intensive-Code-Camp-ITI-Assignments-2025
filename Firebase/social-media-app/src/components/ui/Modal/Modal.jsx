import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './Modal.module.css';

const Modal = forwardRef(({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen: () => isOpen
    }));

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button
                    className={styles.closeButton}
                    onClick={() => setIsOpen(false)}
                    aria-label="Close modal"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
});

Modal.displayName = 'Modal';

export default Modal;
