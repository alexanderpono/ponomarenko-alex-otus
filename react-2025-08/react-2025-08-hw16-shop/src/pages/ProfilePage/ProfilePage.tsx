import React from 'react';
import styles from './ProfilePage.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import { i18n } from 'src/constants/i18n';
import { UpdatePasswordForm } from 'src/features/forms/UpdatePasswordForm/UpdatePasswordForm';
import Modal from 'src/shared/Modal/Modal';

interface ProfilePageProps {
    ctrl: IAppController;
}
export const ProfilePage: React.FC<ProfilePageProps> = ({ ctrl }) => {
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const login = useSelector(appSelector.login);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].profile;
    const isUpdatePasswordVisible = useSelector(appSelector.isUpdatePasswordVisible);
    if (!isUserAuthorized) {
        return <></>;
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
