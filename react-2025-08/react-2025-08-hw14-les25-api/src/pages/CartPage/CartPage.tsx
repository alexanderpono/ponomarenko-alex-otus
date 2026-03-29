import React from 'react';
import styles from './CartPage.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import CartItem from 'src/shared/CartItem/CartItem';
import { i18n } from 'src/constants/i18n';

interface CartPageProps {
    ctrl: IAppController;
}
export const CartPage: React.FC<CartPageProps> = ({ ctrl }) => {
    const products = useSelector(appSelector.products);
    const cart = useSelector(appSelector.cart);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].cart;
    return (
        <div className={cn(styles.CartPage)}>
            {cart.items.map((cartItem) => {
                const product = products.find((product) => product.id === cartItem.productId);
                return (
                    <div key={product?.id}>
                        <CartItem
                            image={product?.photo}
                            count={cartItem.count}
                            price={product?.price}
                            name={product?.name}
                            ctrl={ctrl}
                            productId={product?.id}
                        />
                    </div>
                );
            })}
            {cart.totalPrice !== 0 && <div className={styles.total}>₽ {cart.totalPrice}</div>}
            {cart.totalPrice === 0 && <div className={styles.total}>{translations.cartIsEmpty}</div>}
        </div>
    );
};
export default CartPage;
