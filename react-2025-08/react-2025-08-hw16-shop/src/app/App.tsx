import React from 'react';
import './App.css';
import Modal from 'src/shared/Modal/Modal';
import Layout from 'src/shared/Layout/Layout';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import DetailedProductCard from 'src/shared/DetailedProductCard/DetailedProductCard';
import CartItem from 'src/shared/CartItem/CartItem';
import { IAppController } from './AppController.types';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/appReducer';
import { RootState } from 'src/store/store';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { LoginForm } from 'src/features/forms/LoginForm/LoginForm';
import { EditProductForm } from 'src/features/forms/EditProductForm/EditProductForm';

interface AppProps {
    ctrl: IAppController;
}
export const App: React.FC<AppProps> = ({ ctrl }) => {
    const language = useSelector(appSelector.language);
    const translations = i18n[language].example;
    const products = useSelector(appSelector.products);
    const isLoginFormVisible = useSelector(appSelector.isLoginFormVisible);
    const isRegistering = useSelector(appSelector.isRegistering);
    const isEditProductVisible = useSelector(appSelector.isEditProductVisible);
    const editedProduct = useSelector(appSelector.editedProduct);

    React.useEffect(() => {
        ctrl.onAppMount();
    }, []);

    return (
        <Layout ctrl={ctrl}>
            <Modal visible={false} handleBtCloseClick={() => null}>
                <h2>{translations.modalHeader}</h2>
                <p>{translations.modalText}</p>
            </Modal>
            {/* <ProductCard image="" count={0} price={1999} name={shortText} description={middleText} />
                    <ProductCard image="cat.jpg" count={0} price={1999} name={shortText} description={middleText} /> */}

            {products.map((product) => {
                return <ProductCard key={product.id} ctrl={ctrl} product={product} />;
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
            <Modal visible={isLoginFormVisible} handleBtCloseClick={ctrl.onLoginCloseClick}>
                <LoginForm
                    initialValues={{ login: 'a', password: 'b', repeatPassword: '' }}
                    initialErrors={{
                        login: '',
                        password: '',
                        repeatPassword: ''
                    }}
                    ctrl={ctrl}
                    isRegistering={isRegistering}
                />
            </Modal>

            <Modal visible={isEditProductVisible} handleBtCloseClick={ctrl.onEditProductCloseClick}>
                <EditProductForm
                    initialValues={editedProduct}
                    initialErrors={{
                        id: '',
                        photo: '',
                        price: '',
                        name: '',
                        type: '',
                        desc: ''
                    }}
                    ctrl={ctrl}
                />
            </Modal>
        </Layout>
    );
};

export default App;
