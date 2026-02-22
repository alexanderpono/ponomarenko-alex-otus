import React from 'react';
import styles from './ProductCard.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { Tip } from 'src/shared/Tip/Tip';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';

export interface ProductCardProps {
    image: string;
    count: number;
    price: number;
    name: string;
    description: string;
    detailedDescription?: React.ReactElement;
}
export const ProductCard: React.FC<ProductCardProps> = ({
    image,
    count,
    price,
    name,
    description,
    detailedDescription
}) => {
    const colorTheme = useSelector(appSelector.colorTheme);
    return (
        <div
            className={cn(styles.ProductCard, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
            })}
        >
            {image && <img src={image} alt={name} className={styles.image} />}
            {!image && <div className={styles.defaultImage}></div>}

            <div className={styles.details}>
                <div className={styles.text}>
                    <h2 className={styles.title}>{name}</h2>
                    <p className={styles.description}>
                        {detailedDescription && (
                            <Tip title={detailedDescription} className={styles.tip}>
                                <div style={{ backgroundColor: '#efc' }}>{description}</div>
                            </Tip>
                        )}
                        {!detailedDescription && description}
                    </p>
                </div>
                <div className={styles.price}>₽ {price}</div>
                <BtToBasket count={count} />
            </div>
        </div>
    );
};
export default ProductCard;
