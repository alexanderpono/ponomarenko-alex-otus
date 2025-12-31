import React from 'react';
import styles from './Modal.scss';
import { createPortal } from 'react-dom';

interface ModalProps {
    visible: boolean;
    children?: React.ReactNode;
    handleBtCloseClick?: () => void;
}
export const Modal: React.FC<ModalProps> = ({ visible, children, handleBtCloseClick }) => {
    const ModalComponent = (
        <div className={styles.Modal}>
            <div className={styles.window}>
                <button
                    className={styles.closeButton}
                    id="closeModalBtn"
                    aria-label="Закрыть"
                    onClick={handleBtCloseClick}
                >
                    &times;
                </button>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );

    return <>{visible && createPortal(ModalComponent, document.body)}</>;
};
export default Modal;
