import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GameUI } from '@src/components/GameUI';
import { AuthorizedHead } from '@src/components/AuthorizedHead';
import { LoginForm } from '@src/components/LoginForm';
import { GameSettings } from '@src/components/GameSettings';
import { useAppState } from '@src/store/hooks';
import { FillPercent, Size } from '@src/consts';

interface AppRouterProps {
    invert: (num: number) => void;
    setSize: (size: Size) => void;
    fill: (percent: FillPercent) => void;
    onChangeName: (name: string) => void;
    onLogout: () => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({
    invert,
    onChangeName,
    onLogout,
    fill,
    setSize,
}) => {
    const { userName } = useAppState();
    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    <LoginForm onChangeName={onChangeName} />
                </Route>
                <Route path="/">
                    <AuthorizedHead userName={userName} onLogout={onLogout} />
                    <GameUI invert={invert} />
                    <GameSettings fill={fill} setSize={setSize} />
                </Route>
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
            {userName ? <Redirect to="/" /> : <Redirect to="/login" />}
        </HashRouter>
    );
};
