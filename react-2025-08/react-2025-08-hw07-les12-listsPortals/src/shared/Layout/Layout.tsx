import React from 'react';
import styles from './Layout.scss';
import Header from 'src/shared/Header/Header';

export interface LayoutProps {
    children?: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.Layout}>
            <div className={styles.header}>
                <Header />
            </div>
            {children}
        </div>
    );
};
export default Layout;
