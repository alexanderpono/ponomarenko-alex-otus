import React from 'react';
import styles from './ModalStarter.scss';
import Modal from 'src/shared/Modal/Modal';

export const ModalStarter: React.FC = () => {
    const [text, setText] = React.useState<string>('');
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const onTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setText(evt.target.value);
    };
    const onBtOpenModalClick = () => {
        setIsModalVisible(true);
    };
    const handleBtCloseClick = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div className={styles.ModalStarter}>
                <span>Текст для отображения в модальном окне:</span>
                <input type="text" value={text} onChange={onTextChange} /> <br />
                <button className={styles.btOpenModal} onClick={onBtOpenModalClick}>
                    Открыть модальное окно
                </button>
                <Modal visible={isModalVisible} handleBtCloseClick={handleBtCloseClick}>
                    <p>{text}</p>
                </Modal>
            </div>
        </>
    );
};
export default ModalStarter;
