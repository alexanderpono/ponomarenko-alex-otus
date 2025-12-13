import React from 'react';
import styles from './Modal.scss';

interface ModalProps {
    visible: boolean;
}
export const Modal: React.FC<ModalProps> = () => {
    return <div className={styles.Modal}>Modal2</div>;
};
export default Modal;