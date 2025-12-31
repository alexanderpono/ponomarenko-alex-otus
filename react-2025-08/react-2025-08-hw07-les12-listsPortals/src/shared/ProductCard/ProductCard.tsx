import React, { useContext } from 'react';
import styles from './ProductCard.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';
import { ThemeContext } from 'src/shared/ThemeContext/ThemeContext';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';

interface ProductCardProps {
    image: string;
    count: number;
    price: number;
    name: string;
    description: string;
}
export const ProductCard: React.FC<ProductCardProps> = ({ image, count, price, name, description }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div
            className={cn(styles.ProductCard, {
                [styles.grey]: theme === Theme.GREY,
                [styles.blue]: theme === Theme.BLUE
            })}
        >
            {image && <img src={image} alt={name} className={styles.image} />}
            {!image && <div className={styles.defaultImage}></div>}

            <div className={styles.details}>
                <h2 className={styles.title}>{name}</h2>
                <p className={styles.description}>{description}</p>
                <div className={styles.price}>₽ {price}</div>
                <BtToBasket count={count} />
            </div>
        </div>
    );
};
export default ProductCard;
