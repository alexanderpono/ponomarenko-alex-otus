import React from 'react';
import { User } from 'src/models/User';
import { GetUsersAnswer, getBackend } from '../../Backend';

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
                <h1>Users</h1>
                <ul>
                    {this.state.users.map((user: User) => {
                        return (
                            <li key={user.id}>
                                {user.id} {user.name} {user.role}
                            </li>
                        );
                    })}
                </ul>
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
