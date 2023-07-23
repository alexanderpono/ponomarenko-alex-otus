import React from 'react';
import { User } from '@api-src/models/User';
import { GetUsersAnswer, getBackend } from '@ui-src/Backend';

interface UsersPageProps {}

interface UsersPageState {
    users: User[];
}

export class UsersPage extends React.Component<UsersPageProps, UsersPageState> {
    constructor(props: UsersPageProps) {
        super(props);
        this.state = {
            users: []
        };
    }

    render() {
        return (
            <div>
                <h2>Список пользователей</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user: User) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.role ? user.role : 'user'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        const me = this;
        getBackend()
            .getUsers()
            .then(function (answer: GetUsersAnswer) {
                me.setState({ users: answer.users });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
