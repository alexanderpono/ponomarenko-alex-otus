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
import CartItem from 'src/shared/CartItem/CartItem';
import { IAppController } from './AppController.types';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/appReducer';
import { RootState } from 'src/store/store';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';

interface AppProps {
    ctrl: IAppController;
}
export const App: React.FC<AppProps> = ({ ctrl }) => {
    const language = useSelector(appSelector.language);
    const translations = i18n[language].example;
    const products = useSelector(appSelector.products);

    React.useEffect(() => {
        ctrl.onAppMount();
    }, []);

    return (
        <Layout ctrl={ctrl}>
            {/* <BtToBacket count={0} />
                    <BtToBacket count={1} /> */}
            <Modal visible={false} handleBtCloseClick={() => null}>
                <h2>{translations.modalHeader}</h2>
                <p>{translations.modalText}</p>
            </Modal>
            {/* <ProductCard image="" count={0} price={1999} name={shortText} description={middleText} />
                    <ProductCard image="cat.jpg" count={0} price={1999} name={shortText} description={middleText} /> */}

            {products.map((product) => {
                return (
                    <ProductCard
                        key={product.name}
                        image={product.photo}
                        count={0}
                        price={product.price}
                        name={product.name}
                        description={product.desc}
                    />
                );
            })}
            {/* <DetailedProductCard
                        image="cat.jpg"
                        count={0}
                        price={1999}
                        name={shortText}
                        category={translations.category}
                    >
                        {bigText}
                    </DetailedProductCard> */}
            {/* <CartItem image="" count={1} price={1999} name={shortText} />
                    <CartItem image="cat.jpg" count={2} price={1999} name={shortText} /> */}
        </Layout>
    );
};

export default App;
