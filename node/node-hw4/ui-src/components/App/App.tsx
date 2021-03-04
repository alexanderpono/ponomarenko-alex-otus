import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { AccessChecker } from '../AccessChecker';
import { LoginPage } from '../LoginPage';
import { Menu } from '../Menu';
import { fetchError, selectUser, userName, userRole, UsersPage } from '../UsersPage';
import { getBackend, LoginAnswer } from '@ui-src/Backend';
import { getUserSession } from '@ui-src/auth';
import { store } from '@ui-src/store';
import { validateLoginAnswer } from '@ui-src/Backend/Backend.validators';

export class App extends React.Component {
    render() {
        const userState = selectUser(store.getState());
        return (
            <Router>
                <Menu userState={userState} />
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/main">
                        <AccessChecker redirectPath="/login">
                            <div>main</div>
                        </AccessChecker>
                    </Route>
                    <Route path="/course">
                        <div>course</div>
                    </Route>
                    <Route path="/users">
                        <AccessChecker redirectPath="/login">
                            <UsersPage />
                        </AccessChecker>
                    </Route>
                    <Route path="/mycourses">
                        <div>mycourses</div>
                    </Route>
                    <Route path="/mycourse">
                        <div>mycourse</div>
                    </Route>
                    <Route path="*">
                        <Redirect to="/main" />
                    </Route>
                </Switch>
            </Router>
        );
    }

    oldRole: string | null = null;
    storeChange = () => {
        const userState = selectUser(store.getState());
        const roleChanged = this.oldRole !== userState.role;
        if (roleChanged) {
            this.render();
        }

        this.oldRole = userState.role;
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
