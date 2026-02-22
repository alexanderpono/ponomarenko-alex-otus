import React, { useMemo } from 'react';
import styles from './ProductList.scss';
import cn from 'classnames';
import { Product } from 'src/shared/ProductCard/ProductCard.types';
import ProductCard from 'src/shared/ProductCard/ProductCard';

export interface ProductListProps {
    products: Product[];
}
export const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const filteredProducts = useMemo(() => products.filter((product: Product) => product.count > 0), [products]);
    return (
        <div className={cn(styles.ProductList)}>
            {filteredProducts.map((product: Product) => {
                return (
                    <ProductCard
                        key={`${product.name}-${product.description}`}
                        image={product.image}
                        count={product.count}
                        price={product.price}
                        name={product.name}
                        description={product.description}
                    />
                );
            })}
        </div>
    );
};
export default ProductList;

export const MemoisedProductList = React.memo(ProductList);
