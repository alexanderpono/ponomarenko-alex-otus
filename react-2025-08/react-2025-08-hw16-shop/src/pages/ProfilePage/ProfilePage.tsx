import React from 'react';
import styles from './ProfilePage.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';

interface ProfilePageProps {
    ctrl: IAppController;
}
export const ProfilePage: React.FC<ProfilePageProps> = ({ ctrl }) => {
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const login = useSelector(appSelector.login);
    if (!isUserAuthorized) {
        return <></>;
    }
    return (
        <div className={cn(styles.ProfilePage)}>
            <p>email: {login}</p>
            <button onClick={ctrl.onChangePasswordClick}>Смена пароля</button>
        </div>
    );
};
export default ProfilePage;
