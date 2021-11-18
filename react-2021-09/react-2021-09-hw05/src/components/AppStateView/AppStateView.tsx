import React from 'react';
import { AppState } from '../AppStateController/appReducer';

interface AppStateViewProps {
    appState: AppState;
}
export const AppStateView: React.FC<AppStateViewProps> = (props: AppStateViewProps) => {
    return (
        <>
            <article className="fieldSize">
                <span className="label">field size=</span>
                <span className="value">
                    [{props.appState.fieldWidth} x {props.appState.fieldHeight}]
                </span>
            </article>
        </>
    );
};
