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
                    {!userAuthorized && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {userAuthorized && (
                        <>
                            <li>
                                <Link to="/main">Main</Link>
                            </li>
                            <li>
                                <Link to="/course">Course</Link>
                            </li>
                            {userAdmin && (
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/mycourses">MyCourses</Link>
                            </li>
                            <li>
                                <Link to="/mycourse">MyCourse</Link>
                            </li>
                        </>
                    )}
                    {userAuthorized && (
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}
