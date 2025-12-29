import React from 'react';
import styles from './Modal.scss';

interface ModalProps {
    visible: boolean;
    children?: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ visible, children }) => {
    return (
        <>
            {visible && (
                <div className={styles.Modal}>
                    <div className={styles.window}>
                        <button className={styles.closeButton} id="closeModalBtn" aria-label="Закрыть">
                            &times;
                        </button>
                        <div className={styles.content}>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Modal;
