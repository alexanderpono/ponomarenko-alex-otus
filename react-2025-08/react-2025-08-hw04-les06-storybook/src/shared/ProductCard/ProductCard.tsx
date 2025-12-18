import React from 'react';
import styles from './ProductCard.scss';
import BtToBasket from '../BtToBacket/BtToBasket';

interface ProductCardProps {
    image: string;
    count: number;
    price: number;
    name: string;
    description: string;
}
export const ProductCard: React.FC<ProductCardProps> = ({ image, count, price, name, description }) => {
    return (
        <div className={styles.ProductCard}>
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
