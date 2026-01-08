import React, { useContext } from 'react';
import './App.css';
import Modal from 'src/shared/Modal/Modal';
import Layout from 'src/shared/Layout/Layout';
import { bigText } from 'src/constants/bigText';
import { middleText } from 'src/constants/middleText';
import { shortText } from 'src/constants/shortText';
import BtToBacket from 'src/shared/BtToBacket/BtToBasket';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import DetailedProductCard from 'src/shared/DetailedProductCard/DetailedProductCard';
import CartItem from 'src/shared/CartItem/CartItem';
import { ThemeProvider } from 'src/shared/ThemeContext/ThemeContext';
import { I18nProvider, I18nContext } from 'src/shared/I18nContext/I18nContext';

function App() {
    const { language, i18n } = useContext(I18nContext);
    const translations = i18n[language].example;

    return (
        <I18nProvider>
            <ThemeProvider>
                <Layout>
                    <BtToBacket count={0} />
                    <BtToBacket count={1} />
                    <Modal visible={false} handleBtCloseClick={() => null}>
                        <h2>{translations.modalHeader}</h2>
                        <p>{translations.modalText}</p>
                    </Modal>
                    <ProductCard image="" count={0} price={1999} name={shortText} description={middleText} />
                    <ProductCard image="cat.jpg" count={0} price={1999} name={shortText} description={middleText} />
                    <DetailedProductCard
                        image="cat.jpg"
                        count={0}
                        price={1999}
                        name={shortText}
                        category={translations.category}
                    >
                        {bigText}
                    </DetailedProductCard>
                    <CartItem image="" count={1} price={1999} name={shortText} />
                    <CartItem image="cat.jpg" count={2} price={1999} name={shortText} />
                </Layout>
            </ThemeProvider>
        </I18nProvider>
    );
}

export default App;
