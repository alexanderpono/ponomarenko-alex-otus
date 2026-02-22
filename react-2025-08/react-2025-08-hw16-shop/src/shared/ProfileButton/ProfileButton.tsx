import React from 'react';
import styles from './ProfileButton.scss';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';

interface ProfileButton {
    ctrl: IAppController;
}
export const ProfileButton: React.FC<ProfileButton> = ({ ctrl }) => {
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    return (
        <div className={styles.ProfileButton}>
            {isUserAuthorized && (
                <p className={styles.button} onClick={ctrl.onLogoutClick}>
                    logout
                </p>
            )}
            {!isUserAuthorized && (
                <p className={styles.button} onClick={ctrl.onLoginClick}>
                    login
                </p>
            )}
        </div>
    );
};
export default ProfileButton;
