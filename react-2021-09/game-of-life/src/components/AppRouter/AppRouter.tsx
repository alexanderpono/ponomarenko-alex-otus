import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GameUI } from '@src/components/GameUI';
import { AuthorizedHead } from '@src/components/AuthorizedHead';
import { LoginForm } from '@src/components/LoginForm';
import { GameSettings } from '@src/components/GameSettings';
import { useAppState } from '@src/store/hooks';

interface AppRouterProps {
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

export const AppRouter: React.FC<AppRouterProps> = ({ ...func }) => {
    const { userName } = useAppState();
    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    <LoginForm onChangeName={func.onChangeName} />
                </Route>
                <Route path="/">
                    <AuthorizedHead userName={userName} onLogout={func.onLogout} />
                    <GameUI invert={func.invert} />
                    <GameSettings {...func} />
                </Route>
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
            {userName ? <Redirect to="/" /> : <Redirect to="/login" />}
        </HashRouter>
    );
};
