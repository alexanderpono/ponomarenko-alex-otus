import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAppController } from 'src/app/AppController.types';

interface LogoutPageProps {
    ctrl: IAppController;
}

export const LogoutPage: React.FC<LogoutPageProps> = ({ ctrl }) => {
    const navigate = useNavigate();

    useEffect(() => {
        ctrl.onLogoutClick();

        navigate('/products', { replace: true });
    }, [ctrl, navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutPage;
