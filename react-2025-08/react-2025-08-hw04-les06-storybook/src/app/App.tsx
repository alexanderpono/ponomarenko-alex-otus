import React from 'react';
import './App.css';
import Modal from 'src/shared/Modal/Modal';
import Layout from 'src/shared/Layout/Layout';
import { bigText } from 'src/constants/bigText';
import { middleText } from 'src/constants/middleText';
import { shortText } from 'src/constants/shortText';
import BtToBacket from 'src/shared/BtToBacket/BtToBasket';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import DetailedProductCard from 'src/shared/DetailedProductCard/DetailedProductCard';

function App() {
    return (
        <>
            <Layout>
                <BtToBacket count={0} />
                <BtToBacket count={1} />
                <Modal visible={false}>
                    <h2>Заголовок</h2>
                    <p>Текст писать ту-тут</p>
                </Modal>
                <ProductCard image="" count={0} price={1999} name={shortText} description={middleText} />
                <ProductCard image="cat.jpg" count={0} price={1999} name={shortText} description={middleText} />
                <DetailedProductCard image="cat.jpg" count={0} price={1999} name={shortText} category="Cats">
                    {bigText}
                </DetailedProductCard>
            </Layout>
        </>
    );
}

export default App;
