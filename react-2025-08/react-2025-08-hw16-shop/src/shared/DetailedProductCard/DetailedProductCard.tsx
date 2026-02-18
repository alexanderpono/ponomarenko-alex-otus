import React from 'react';
import styles from './DetailedProductCard.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';

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
    const colorTheme = useSelector(appSelector.colorTheme);
    return (
        <>
            <div
                className={cn(styles.DetailedProductCard, {
                    [styles.grey]: colorTheme === Theme.GREY,
                    [styles.blue]: colorTheme === Theme.BLUE
                })}
            >
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
