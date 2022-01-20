import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GameUI } from '@src/components/GameUI';
import { AuthorizedHead } from '@src/components/AuthorizedHead';
import { LoginForm } from '@src/components/LoginForm';
import { GameSettings } from '@src/components/GameSettings';
import { AppState } from '@src/store/ducks/game';

interface AppRouterProps {
    appState: AppState;
    invert: (num: number) => void;
    setSmall: () => void;
    setMedium: () => void;
    setLarge: () => void;
    clear: () => void;
    fill25: () => void;
    fill50: () => void;
    fill75: () => void;
    fill100: () => void;
    onChangeName: (name: string) => void;
    onLogout: () => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({ appState, ...func }) => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    <LoginForm onChangeName={func.onChangeName} />
                </Route>
                <Route path="/">
                    <AuthorizedHead userName={appState.userName} onLogout={func.onLogout} />
                    <GameUI invert={func.invert} />
                    <GameSettings appState={appState} {...func} />
                </Route>
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
            {appState.userName ? <Redirect to="/" /> : <Redirect to="/login" />}
        </HashRouter>
    );
};
