import React from 'react';
import styles from './Layout.scss';
import Header from 'src/shared/Header/Header';
import { IAppController } from 'src/app/AppController.types';

export interface LayoutProps {
    children?: React.ReactNode;
    ctrl: IAppController;
}
export const Layout: React.FC<LayoutProps> = ({ children, ctrl }) => {
    return (
        <div className={styles.Layout}>
            <div className={styles.header}>
                <Header ctrl={ctrl} />
            </div>
            {children}
        </div>
    );
};
export default Layout;
