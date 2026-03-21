import React from 'react';
import styles from './ProfilePage.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import { i18n } from 'src/constants/i18n';
import { UpdatePasswordForm } from 'src/features/forms/UpdatePasswordForm/UpdatePasswordForm';
import Modal from 'src/shared/Modal/Modal';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
    ctrl: IAppController;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ ctrl }) => {
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const login = useSelector(appSelector.login);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].profile;
    const isUpdatePasswordVisible = useSelector(appSelector.isUpdatePasswordVisible);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isUserAuthorized) {
            navigate('/products', { replace: true });
        }
    }, [isUserAuthorized, navigate]);

    if (!isUserAuthorized) {
        return null;
    }

    return (
        <div className={cn(styles.ProfilePage)}>
            <p>email: {login}</p>
            <button onClick={ctrl.onChangePasswordClick}>{translations.updatePassword}</button>

            <Modal
                visible={isUpdatePasswordVisible}
                handleBtCloseClick={ctrl.onUpdatePasswordCloseClick}
                title={translations.updatePassword}
            >
                <UpdatePasswordForm
                    initialValues={{ password: '', newPassword: '' }}
                    initialErrors={{
                        password: '',
                        newPassword: ''
                    }}
                    ctrl={ctrl}
                />
            </Modal>
        </div>
    );
};

export default ProfilePage;
