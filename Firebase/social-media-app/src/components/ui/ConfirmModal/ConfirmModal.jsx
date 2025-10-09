import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './ConfirmModal.module.css';

const ConfirmModal = forwardRef(({
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger"
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState(null);
    const [onCancel, setOnCancel] = useState(null);

    useImperativeHandle(ref, () => ({
        open: (confirmCallback, cancelCallback) => {
            setOnConfirm(() => confirmCallback);
            setOnCancel(() => cancelCallback);
            setIsOpen(true);
        },
        close: () => setIsOpen(false)
    }));

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        setIsOpen(false);
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleCancel}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.title}>{title}</h3>
                </div>

                <div className={styles.modalBody}>
                    <p className={styles.message}>{message}</p>
                </div>

                <div className={styles.modalFooter}>
                    <Button
                        variant="text"
                        onClick={handleCancel}
                        className={styles.cancelButton}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        onClick={handleConfirm}
                        className={styles.confirmButton}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
});

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;
