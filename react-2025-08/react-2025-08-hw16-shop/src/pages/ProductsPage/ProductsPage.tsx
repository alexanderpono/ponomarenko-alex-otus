import React from 'react';
import styles from './ProductsPage.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import { EditProductForm } from 'src/features/forms/EditProductForm/EditProductForm';
import Modal from 'src/shared/Modal/Modal';

interface ProductsPageProps {
    ctrl: IAppController;
}
export const ProductsPage: React.FC<ProductsPageProps> = ({ ctrl }) => {
    const products = useSelector(appSelector.products);
    const isEditProductVisible = useSelector(appSelector.isEditProductVisible);
    const editedProduct = useSelector(appSelector.editedProduct);
    return (
        <div className={cn(styles.ProductsPage)}>
            <div className={styles.menu}>
                <span className={styles.menuItem} onClick={ctrl.onAddProductClick}>
                    + Add product
                </span>
            </div>
            {products.map((product) => {
                return <ProductCard key={product.id} ctrl={ctrl} product={product} />;
            })}

            <Modal
                visible={isEditProductVisible}
                handleBtCloseClick={ctrl.onEditProductCloseClick}
                title={editedProduct.id ? 'Продукт' : 'Новый продукт'}
            >
                <div>
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
                </div>
            </Modal>
        </div>
    );
};
export default ProductsPage;
