import React, { useRef } from 'react';
import styles from './ProductsPage.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController, NEW_ENTITY_ID } from 'src/app/AppController.types';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import { EditProductForm } from 'src/features/forms/EditProductForm/EditProductForm';
import Modal from 'src/shared/Modal/Modal';
import { i18n } from 'src/constants/i18n';

interface ProductsPageProps {
    ctrl: IAppController;
}
export const ProductsPage: React.FC<ProductsPageProps> = ({ ctrl }) => {
    const products = useSelector(appSelector.products);
    const isEditProductVisible = useSelector(appSelector.isEditProductVisible);
    const editedProduct = useSelector(appSelector.editedProduct);
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].editProductForm;
    const listRef = useRef<HTMLDivElement>();
    const loaderRef = useRef<HTMLDivElement>();

    React.useEffect(() => {
        const root = listRef.current;
        if (loaderRef.current) {
            const observer = new IntersectionObserver(ctrl.processScrollProductsEvent, {
                root,
                threshold: 1.0,
                rootMargin: '0px'
            });
            observer.observe(loaderRef.current);
            return () => observer.disconnect();
        }
    }, [products]);

    return (
        <div className={cn(styles.ProductsPage)} ref={listRef}>
            {isUserAuthorized && (
                <div className={styles.menu}>
                    <span className={styles.menuItem} onClick={ctrl.onAddProductClick}>
                        + {translations.addProduct}
                    </span>
                </div>
            )}
            {products.map((product) => {
                return <ProductCard key={product.id} ctrl={ctrl} product={product} />;
            })}
            <div className={styles.loader} ref={loaderRef}>
                &nbsp;
            </div>
            <Modal
                visible={isEditProductVisible}
                handleBtCloseClick={ctrl.onEditProductCloseClick}
                title={editedProduct.id !== NEW_ENTITY_ID ? translations.product : translations.newProduct}
            >
                <div>
                    <EditProductForm
                        initialValues={editedProduct}
                        initialErrors={{
                            id: '',
                            photo: '',
                            price: '',
                            name: '',
                            categoryId: '',
                            desc: ''
                        }}
                        ctrl={ctrl}
                    />
                </div>
            </Modal>
        </div>
    );
};
export default ProductsPage;
