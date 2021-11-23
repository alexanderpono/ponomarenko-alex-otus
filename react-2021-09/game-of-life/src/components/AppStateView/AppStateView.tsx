import React from 'react';
import { AppState } from '../AppStateManager/appReducer';

interface AppStateViewProps {
    appState: AppState;
}
export const AppStateView: React.FC<AppStateViewProps> = ({ appState }) => {
    return (
        <>
            <article className="fieldWidth">
                <span className="label">fieldWidth=</span>
                <span className="value">{appState.fieldWidth}</span>
            </article>
            <article className="fieldHeight">
                <span className="label">fieldWidth=</span>
                <span className="value">{appState.fieldHeight}</span>
            </article>
            <article className="dataFromBack">
                <span className="label">dataFromBack=</span>
                <span className="value">{JSON.stringify(appState.dataFromBack)}</span>
            </article>
            <article className="mouse">
                <span className="label">mouse=</span>
                <span className="value">
                    ({appState.mouse.x},{appState.mouse.y})
                </span>
            </article>
        </>
    );
};
