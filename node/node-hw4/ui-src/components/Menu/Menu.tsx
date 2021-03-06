import React from 'react';
import { Link } from 'react-router-dom';
import { UserState } from '../UsersPage';

interface Props {
    userState: UserState;
}
export class Menu extends React.Component<Props> {
    render() {
        const userState = this.props.userState;
        const userAuthorized = userState.name !== null && userState.name !== '';
        const userAdmin = userState.role === 'admin';

        return (
            <nav>
                <ul>
                    <li>
                        <h1>My-courses</h1>
                    </li>
                    {userAuthorized && (
                        <>
                            <li>
                                <Link to="/main">Общие курсы</Link>
                            </li>
                            {userAdmin && (
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/mycourses">Мои курсы</Link>
                            </li>
                        </>
                    )}
                    {userAuthorized && (
                        <li>
                            <Link to="/logout">Выход</Link>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}
