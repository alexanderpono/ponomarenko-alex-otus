import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { AccessChecker } from '../AccessChecker';
import { LoginPage } from '../LoginPage';
import { Menu } from '../Menu';
import {
    fetchError,
    selectUser,
    Status,
    userName,
    userRole,
    UsersPage,
    UserState,
    defaultState as userDefaultState
} from '../UsersPage';
import { getBackend, LoginAnswer } from '@ui-src/Backend';
import { getUserSession, login, logout } from '@ui-src/auth';
import { store } from '@ui-src/store';
import { validateLoginAnswer } from '@ui-src/Backend/Backend.validators';
import { LogoutPage } from '../LogoutPage';

interface AppState {
    stateFromRedux: UserState;
}
interface Props {}

export class App extends React.Component<Props, AppState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            stateFromRedux: userDefaultState
        };
    }

    updateUserState = (stateFromRedux: UserState) => this.setState({ stateFromRedux });

    render() {
        const userState = selectUser(store.getState());
        return (
            <Router>
                <Menu userState={userState} />
                <Switch>
                    <Route path="/login">
                        <LoginPage userState={userState} />
                    </Route>
                    <Route path="/logout">
                        <LogoutPage />
                    </Route>
                    <Route path="/main">
                        <AccessChecker redirectPath="/login">
                            <div>[Список общедоступных курсов]</div>
                        </AccessChecker>
                    </Route>
                    <Route path="/users">
                        <AccessChecker redirectPath="/login">
                            <UsersPage />
                        </AccessChecker>
                    </Route>
                    <Route path="/mycourses">
                        <AccessChecker redirectPath="/login">
                            <div>[Список моих курсов]</div>
                        </AccessChecker>
                    </Route>
                    <Route path="/mycourse">
                        <div>[Параметры моего курса]</div>
                    </Route>
                    <Route path="*">
                        <Redirect to="/main" />
                    </Route>
                </Switch>
            </Router>
        );
    }

    oldUser: UserState | null = null;
    storeChange = () => {
        const userState = selectUser(store.getState());

        if (userState !== this.oldUser) {
            if (this.oldUser !== null) {
                if (
                    userState.name !== this.oldUser.name ||
                    userState.status !== this.oldUser.status ||
                    userState.role !== this.oldUser.role
                ) {
                    this.updateUserState(userState);
                }
            } else {
                this.updateUserState(userState);
            }
        }
        if (userState.status === Status.ACCESS_GRANTED && userState.name) {
            login(userState.name);
        }
        if (
            [Status.FETCH_ERROR, Status.USER_NOT_FOUND, Status.LOGOUT].indexOf(userState.status) !==
            -1
        ) {
            logout();
        }

        this.oldUser = userState;
    };

    componentDidMount() {
        store.subscribe(this.storeChange);

        const user = getUserSession();
        if (typeof user !== 'string' || user === '') {
            return;
        }

        getBackend()
            .postAuth(String(user))
            .then(([resp, json]) => {
                if (resp.status === 200) {
                    const authAnswer = json as LoginAnswer;

                    const validateResult = validateLoginAnswer(authAnswer);
                    if (validateResult.errors.length !== 0) {
                        return Promise.reject(validateResult);
                    }

                    const role = typeof authAnswer.role === 'string' ? authAnswer.role : 'user';

                    store.dispatch(userName(user));
                    store.dispatch(userRole(role));
                }
            })
            .catch(function (error) {
                store.dispatch(fetchError(JSON.stringify(error)));
                console.error(error);
            });
    }
}
