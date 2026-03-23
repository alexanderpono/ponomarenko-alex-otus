import React from 'react';
import styles from './ProfileButton.scss';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import { i18n } from 'src/constants/i18n';
import { useNavigate } from 'react-router-dom';

export interface ProfileButtonProps {
    ctrl: IAppController;
}
export const ProfileButton: React.FC<ProfileButtonProps> = ({ ctrl }) => {
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].profile;
    const navigate = useNavigate();

    const handleClick = () => {
        if (isUserAuthorized) {
            navigate('/logout');
        } else {
            ctrl.onLoginClick();
        }
    };

    return (
        <div className={styles.ProfileButton}>
            <p className={styles.button} onClick={handleClick}>
                {isUserAuthorized ? translations.logout : translations.login}
            </p>
        </div>
    );
};
export default ProfileButton;
