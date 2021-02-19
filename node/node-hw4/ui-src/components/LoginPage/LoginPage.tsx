import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../auth';
import { getBackend } from '../../Backend';

interface LoginPageProps {}

enum Status {
    DEFAULT = 'DEFAULT',
    FETCH_ERROR = 'FETCH_ERROR',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    ACCESS_GRANTED = 'ACCESS_GRANTED'
}
enum Actions {
    FETCH_ERROR = 'FETCH_ERROR',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    ACCESS_GRANTED = 'ACCESS_GRANTED'
}

interface LoginPageState {
    name: string;
    status: Status;
}
interface Action {
    type: string;
    payload: Record<string, never>;
}
const fetchError = (): Action => ({ type: Actions.FETCH_ERROR, payload: {} });
const userNotFound = (): Action => ({ type: Actions.USER_NOT_FOUND, payload: {} });
const accessGranted = (): Action => ({ type: Actions.ACCESS_GRANTED, payload: {} });

const reducerFn = (state: LoginPageState, action: Action): LoginPageState => {
    switch (action.type) {
        case Actions.FETCH_ERROR: {
            return { ...state, status: Status.FETCH_ERROR };
        }
        case Actions.USER_NOT_FOUND: {
            return { ...state, status: Status.USER_NOT_FOUND };
        }
        case Actions.ACCESS_GRANTED: {
            return { ...state, status: Status.ACCESS_GRANTED };
        }
    }
    return state;
};

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            name: '',
            status: Status.DEFAULT
        };
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        const me = this;

        getBackend()
            .postAuth(this.state.name)
            .then(([resp, json]) => {
                console.log('Stream complete resp=', resp);
                console.log('Stream complete json=', json);
                console.log('Stream complete resp.status=', resp.status);
                if (resp.status === 401) {
                    me.setState(reducerFn(me.state, userNotFound()));
                }
                if (resp.status === 200) {
                    me.setState(reducerFn(me.state, accessGranted()));
                    login(this.state.name);
                }
            })
            .catch(function (error) {
                me.setState(reducerFn(me.state, fetchError()));
                console.error(error);
            });
    };

    setName = (name: string) => this.setState({ ...this.state, name });

    render() {
        const userNotFound =
            this.state.status === Status.USER_NOT_FOUND ? (
                <div className="error">User not found</div>
            ) : (
                ''
            );
        const fetchError =
            this.state.status === Status.FETCH_ERROR ? (
                <div className="error">Fetch error</div>
            ) : (
                ''
            );
        const accessGranted = this.state.status === Status.ACCESS_GRANTED;

        if (accessGranted) {
            return <Redirect to={'/main'} />;
        }

        return (
            <div>
                <h1>Login</h1>

                <form onSubmit={this.onSubmit}>
                    <label>
                        Name:
                        <input
                            placeholder="Введите свое имя"
                            value={this.state.name}
                            onChange={(ev) => this.setName((ev.target as HTMLInputElement).value)}
                            required
                            minLength={2}
                            maxLength={10}
                        />
                    </label>
                    <button>Login</button>
                </form>

                {userNotFound}
                {fetchError}
            </div>
        );
    }
}
