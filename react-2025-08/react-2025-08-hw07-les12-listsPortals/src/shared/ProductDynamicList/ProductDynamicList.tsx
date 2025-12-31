import React from 'react';
import styles from './ProductDynamicList.scss';
import cn from 'classnames';
import ProductList from 'src/shared/ProductList/ProductList';
import { Product } from 'src/shared/ProductCard/ProductCard.types';

interface ProductDynamicListProps {
    products: Product[];
}
export const ProductDynamicList: React.FC<ProductDynamicListProps> = ({ products }) => {
    const listRef = React.useRef<HTMLDivElement>();
    const loaderRef = React.useRef<HTMLDivElement>();
    const [isLoadingProducts, setIsLoadingProducts] = React.useState(false);
    const [myProducts, setMyProducts] = React.useState(products);

    const loadMore = () => {
        const newProduct: Product = {
            image: '',
            count: myProducts.length,
            price: myProducts.length,
            name: 'name' + myProducts.length,
            description: 'descr' + myProducts.length
        };
        setMyProducts([...myProducts, newProduct]);
        return Promise.resolve(newProduct);
    };

    const processScrollEvent = (observers: IntersectionObserverEntry[]) => {
        const loader = observers[0];
        const canLoadMore = true;
        if (loader.isIntersecting && canLoadMore) {
            if (!isLoadingProducts) {
                setIsLoadingProducts(true);
                loadMore().finally(() => setIsLoadingProducts(false));
            }
        }
    };

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
            <ProductList products={myProducts} />
            <div className={styles.loader} ref={loaderRef}>
                &nbsp;
            </div>
        </div>
    );
};
export default ProductList;
