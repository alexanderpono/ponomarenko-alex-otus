import React, { useCallback, useRef, useState } from 'react';
import styles from './ProductDynamicList.scss';
import cn from 'classnames';
import { MemoisedProductList } from 'src/shared/ProductList/ProductList';
import { Product } from 'src/shared/ProductCard/ProductCard.types';

interface ProductDynamicListProps {
    products: Product[];
}
export const ProductDynamicList: React.FC<ProductDynamicListProps> = ({ products }) => {
    const listRef = useRef<HTMLDivElement>();
    const loaderRef = useRef<HTMLDivElement>();
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [myProducts, setMyProducts] = useState(products);

    const loadMore = useCallback(() => {
        const newProduct: Product = {
            image: '',
            count: myProducts.length,
            price: myProducts.length,
            name: 'name' + myProducts.length,
            description: 'descr' + myProducts.length
        };
        setMyProducts([...myProducts, newProduct]);
        return Promise.resolve(newProduct);
    }, [setMyProducts, myProducts]);

    const processScrollEvent = useCallback(
        (observers: IntersectionObserverEntry[]) => {
            const loader = observers[0];
            const canLoadMore = true;
            if (loader.isIntersecting && canLoadMore) {
                if (!isLoadingProducts) {
                    setIsLoadingProducts(true);
                    loadMore().finally(() => setIsLoadingProducts(false));
                }
            }
        },
        [setIsLoadingProducts, loadMore]
    );

    React.useEffect(() => {
        const root = listRef.current;
        if (loaderRef.current) {
            const observer = new IntersectionObserver(processScrollEvent, { root, threshold: 1.0, rootMargin: '0px' });
            observer.observe(loaderRef.current);
            return () => observer.disconnect();
        }
    }, [myProducts]);
    return (
        <div className={cn(styles.ProductDynamicList)} ref={listRef}>
            <MemoisedProductList products={myProducts} />
            <div className={styles.loader} ref={loaderRef}>
                &nbsp;
            </div>
        </div>
    );
};
