import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { getUserSession } from '@ui-src/auth';
import { store } from '@ui-src/store';
import { selectUser } from '../UsersPage';

export interface Props {
    children: ReactNode;
    redirectPath: string;
}

export class AccessChecker extends React.Component<Props> {
    render() {
        const userState = selectUser(store.getState());
        const user = getUserSession();
        if (typeof user === 'string' && user !== '') {
            return (
                <>
                    <p className="greeting">
                        Добро пожаловать, {userState.name}! Ваша роль: {userState.role}
                    </p>
                    {this.props.children}
                </>
            );
        } else {
            return <Redirect to={this.props.redirectPath} />;
        }
    }
}
