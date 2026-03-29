import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Modal from 'src/shared/Modal/Modal';
import Layout from 'src/shared/Layout/Layout';
import { IAppController } from './AppController.types';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import CategoriesPage from 'src/pages/CategoriesPage/CategoriesPage';
import ProductsPage from 'src/pages/ProductsPage/ProductsPage';
import CartPage from 'src/pages/CartPage/CartPage';
import ProfilePage from 'src/pages/ProfilePage/ProfilePage';
import LogoutPage from 'src/pages/LogoutPage/LogoutPage';
import { LoginFormFetch } from 'src/features/forms/LoginFormFetch/LoginFormFetch';
import { RegisterFormSaga } from 'src/features/forms/RegisterFormSaga/RegisterFormSaga';

interface AppProps {
    ctrl: IAppController;
}

export const App: React.FC<AppProps> = ({ ctrl }) => {
    const language = useSelector(appSelector.language);
    const translations = i18n[language].app;
    const isLoginFormVisible = useSelector(appSelector.isLoginFormVisible);
    const isRegistering = useSelector(appSelector.isRegistering);
    const isRegisterSagaVisible = useSelector(appSelector.isRegisterSagaVisible);

    React.useEffect(() => {
        ctrl.onAppMount();
    }, []);

    return (
        <Router>
            <Layout ctrl={ctrl}>
                <Modal visible={false} handleBtCloseClick={() => null}>
                    <h2>{translations.modalHeader}</h2>
                    <p>{translations.modalText}</p>
                </Modal>

                <Routes>
                    <Route path="/products" element={<ProductsPage ctrl={ctrl} />} />
                    <Route path="/categories" element={<CategoriesPage ctrl={ctrl} />} />
                    <Route path="/cart" element={<CartPage ctrl={ctrl} />} />
                    <Route path="/profile" element={<ProfilePage ctrl={ctrl} />} />
                    <Route path="/logout" element={<LogoutPage ctrl={ctrl} />} />
                    <Route path="*" element={<Navigate to="/products" />} />
                </Routes>

                <Modal
                    visible={isLoginFormVisible}
                    handleBtCloseClick={ctrl.onLoginCloseClick}
                    title={'Register using fetch API'}
                >
                    <LoginFormFetch
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

                <Modal
                    visible={isRegisterSagaVisible}
                    handleBtCloseClick={ctrl.onLoginCloseClick}
                    title={'Register using Saga'}
                >
                    <RegisterFormSaga
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
        </Router>
    );
};

export default App;
