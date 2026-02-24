import React from 'react';
import styles from './ProductCard.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { Tip } from 'src/shared/Tip/Tip';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import { Product } from 'src/entities/Product';

export interface ProductCardProps {
    detailedDescription?: React.ReactElement;
    ctrl: IAppController;
    product: Product;
}
export const ProductCard: React.FC<ProductCardProps> = ({ detailedDescription, ctrl, product }) => {
    const colorTheme = useSelector(appSelector.colorTheme);
    return (
        <div
            className={cn(styles.ProductCard, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
            })}
            data-id={product.id}
        >
            {product.photo && <img src={product.photo} alt={product.name} className={styles.image} />}
            {!product.photo && <div className={styles.defaultImage}></div>}

            <div className={styles.details}>
                <div className={styles.text}>
                    <h2 className={styles.title}>{product.name}</h2>
                    <p className={styles.description}>
                        {detailedDescription && (
                            <Tip title={detailedDescription} className={styles.tip}>
                                <div style={{ backgroundColor: '#efc' }}>{product.desc}</div>
                            </Tip>
                        )}
                        {!detailedDescription && product.desc}
                    </p>
                </div>
                <div className={styles.price}>₽ {product.price}</div>
                <div className={styles.buttons}>
                    <BtToBasket count={product.count} />
                    <div className={styles.btEdit} onClick={ctrl.onProductEditClick}>
                        edit
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
