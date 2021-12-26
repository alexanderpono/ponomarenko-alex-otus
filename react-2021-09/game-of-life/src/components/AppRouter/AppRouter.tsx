import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AppUI, AppUIProps } from '@src/components/AppUI';

export const AppRouter: React.FC<AppUIProps> = (props) => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    <AppUI {...props} />
                </Route>
                <Route path="/game">
                    <AppUI {...props} />
                </Route>
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
            {!props.appState.userName && <Redirect to="/login" />}
            {props.appState.userName && <Redirect to="/game" />}
        </HashRouter>
    );
};
