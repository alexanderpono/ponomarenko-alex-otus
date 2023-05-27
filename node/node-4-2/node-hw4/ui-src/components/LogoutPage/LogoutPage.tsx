import React from 'react';
import { Redirect } from 'react-router-dom';
import { store } from '@ui-src/store';
import { userLogout } from '../UsersPage';

export class LogoutPage extends React.Component {
    render() {
        return <Redirect to={'/login'} />;
    }

    componentDidMount() {
        store.dispatch(userLogout());
    }
}
