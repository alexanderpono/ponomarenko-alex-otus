import React, { useMemo } from 'react';
import styles from './ProductList.scss';
import cn from 'classnames';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import { IAppController } from 'src/app/AppController.types';
import { Product } from 'src/entities/Product';

export interface ProductListProps {
    products: Product[];
    ctrl: IAppController;
}
export const ProductList: React.FC<ProductListProps> = ({ products, ctrl }) => {
    const filteredProducts = useMemo(() => products.filter((product: Product) => product.count > 0), [products]);
    return (
        <div className={cn(styles.ProductList)}>
            {filteredProducts.map((product: Product) => {
                return <ProductCard key={product.id} product={product} ctrl={ctrl} />;
            })}
        </div>
    );
};
export default ProductList;

export const MemoisedProductList = React.memo(ProductList);
