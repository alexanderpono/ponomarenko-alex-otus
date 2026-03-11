import React from 'react';
import styles from './ProfileButton.scss';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import { i18n } from 'src/constants/i18n';

export interface ProfileButtonProps {
    ctrl: IAppController;
}
export const ProfileButton: React.FC<ProfileButtonProps> = ({ ctrl }) => {
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].profileButton;
    return (
        <div className={styles.ProfileButton}>
            {isUserAuthorized && (
                <p className={styles.button} onClick={ctrl.onLogoutClick}>
                    {translations.logout}
                </p>
            )}
            {!isUserAuthorized && (
                <p className={styles.button} onClick={ctrl.onLoginClick}>
                    {translations.login}
                </p>
            )}
        </div>
    );
};
export default ProfileButton;
