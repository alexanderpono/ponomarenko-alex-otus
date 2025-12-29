import React from 'react';
import styles from './Header.scss';
import Logo from 'src/shared/Logo/Logo';

export const Header: React.FC = () => {
    return (
        <div className={styles.Header}>
            <Logo />
            Header
        </div>
    );
};
export default Header;
