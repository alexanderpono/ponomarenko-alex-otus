import React from 'react';
import styles from './ProductList.scss';
import cn from 'classnames';
import { Product } from 'src/shared/ProductCard/ProductCard.types';
import ProductCard from 'src/shared/ProductCard/ProductCard';

interface ProductListProps {
    products: Product[];
}
export const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className={cn(styles.ProductList)}>
            {products.map((product: Product, index: number) => {
                return (
                    <ProductCard
                        key={index}
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
