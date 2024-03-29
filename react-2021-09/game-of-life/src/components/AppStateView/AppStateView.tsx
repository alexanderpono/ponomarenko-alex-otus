import React from 'react';
import { AppState } from '@src/store/ducks/game';

interface AppStateViewProps {
    appState: AppState;
}
export const AppStateView: React.FC<AppStateViewProps> = ({ appState }) => {
    return (
        <>
            <article className="fieldSize">
                <span className="label">field size=</span>
                <span className="value">
                    [{appState.fieldWidth} x {appState.fieldHeight}]
                </span>
            </article>
        </>
    );
};
