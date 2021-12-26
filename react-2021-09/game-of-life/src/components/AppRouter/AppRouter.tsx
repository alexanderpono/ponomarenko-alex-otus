import React from 'react';
import { AppState } from '@src/components/AppStateManager/appReducer';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AppUI, AppUIProps } from '@src/components/AppUI';

export const AppRouter: React.FC<AppUIProps> = (props) => {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
};
