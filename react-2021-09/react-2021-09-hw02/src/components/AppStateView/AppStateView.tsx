import React from 'react';
import { AppState } from '../AppStateController/appReducer';

interface AppStateViewProps {
    appState: AppState;
}
export const AppStateView: React.FC<AppStateViewProps> = (props: AppStateViewProps) => {
    return (
        <>
            <article className="fieldWidth">
                <span className="label">fieldWidth=</span>
                <span className="value">{props.appState.fieldWidth}</span>
            </article>
            <article className="fieldHeight">
                <span className="label">fieldWidth=</span>
                <span className="value">{props.appState.fieldHeight}</span>
            </article>
        </>
    );
};
