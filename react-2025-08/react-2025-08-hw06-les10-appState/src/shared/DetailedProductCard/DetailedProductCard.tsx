import React from 'react';
import styles from './DetailedProductCard.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';

export interface DetailedProductCardProps {
    image: string;
    count: number;
    price: number;
    name: string;
    category: string;
    children?: React.ReactNode;
}
export const DetailedProductCard: React.FC<DetailedProductCardProps> = ({
    image,
    count,
    price,
    name,
    children,
    category
}) => {
    return (
        <>
            <div className={styles.DetailedProductCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{name}</h1>
                    <span className={styles.category}>{category}</span>
                </div>

                <div className={styles.main}>
                    {image && <img src={image} alt={name} className={styles.image} />}
                    {!image && <div className={styles.defaultImage}></div>}

                    <div className={styles.info}>
                        <div className={styles.price}>₽ {price}</div>

                        <div className={styles.description}>{children}</div>

                        <BtToBasket count={count} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default DetailedProductCard;
