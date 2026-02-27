import React from 'react';
import styles from './Modal.scss';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';

interface ModalProps {
    visible: boolean;
    children: React.ReactNode;
    handleBtCloseClick: () => void;
    title?: string;
}
export const Modal: React.FC<ModalProps> = ({ visible, children, handleBtCloseClick, title }) => {
    const colorTheme = useSelector(appSelector.colorTheme);
    const ModalComponent = (
        <div className={styles.Modal}>
            <div className={styles.window}>
                {title && (
                    <div
                        className={cn(styles.title, {
                            [styles.grey]: colorTheme === Theme.GREY,
                            [styles.blue]: colorTheme === Theme.BLUE
                        })}
                    >
                        {title}
                    </div>
                )}
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
