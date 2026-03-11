import React from 'react';
import './App.css';
import Modal from 'src/shared/Modal/Modal';
import Layout from 'src/shared/Layout/Layout';
import { IAppController, Partition } from './AppController.types';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { LoginForm } from 'src/features/forms/LoginForm/LoginForm';
import CategoriesPage from 'src/pages/CategoriesPage/CategoriesPage';
import ProductsPage from 'src/pages/ProductsPage/ProductsPage';
import CartPage from 'src/pages/CartPage/CartPage';
import ProfilePage from 'src/pages/ProfilePage/ProfilePage';

interface AppProps {
    ctrl: IAppController;
}
export const App: React.FC<AppProps> = ({ ctrl }) => {
    const language = useSelector(appSelector.language);
    const translations = i18n[language].example;
    const isLoginFormVisible = useSelector(appSelector.isLoginFormVisible);
    const isRegistering = useSelector(appSelector.isRegistering);
    const curPartition = useSelector(appSelector.curPartition);

    React.useEffect(() => {
        ctrl.onAppMount();
    }, []);

    return (
        <Layout ctrl={ctrl}>
            <Modal visible={false} handleBtCloseClick={() => null}>
                <h2>{translations.modalHeader}</h2>
                <p>{translations.modalText}</p>
            </Modal>

            {curPartition === Partition.PRODUCTS && <ProductsPage ctrl={ctrl} />}
            {curPartition === Partition.CATEGORIES && <CategoriesPage ctrl={ctrl} />}
            {curPartition === Partition.CART && <CartPage ctrl={ctrl} />}
            {curPartition === Partition.PROFILE && <ProfilePage ctrl={ctrl} />}

            <Modal visible={isLoginFormVisible} handleBtCloseClick={ctrl.onLoginCloseClick} title={'Login'}>
                <LoginForm
                    initialValues={{ login: '', password: '', repeatPassword: '' }}
                    initialErrors={{
                        login: '',
                        password: '',
                        repeatPassword: ''
                    }}
                    ctrl={ctrl}
                    isRegistering={isRegistering}
                />
            </Modal>
        </Layout>
    );
};

export default App;
