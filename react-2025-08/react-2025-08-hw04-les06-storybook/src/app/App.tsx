import React from 'react';
import './App.css';
import Modal from 'src/shared/Modal/Modal';
import Layout from 'src/shared/Layout/Layout';
import { bigText } from 'src/constants/bigText';

function App() {
    return (
        <>
            <Layout>
                {bigText}
                {bigText}
                {bigText}
                <Modal visible={true}>
                    <h2>Заголовок</h2>
                    <p>Текст писать ту-тут</p>
                </Modal>
            </Layout>
        </>
    );
}

export default App;
