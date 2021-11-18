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
            <article className="dataFromBack">
                <span className="label">dataFromBack=</span>
                <span className="value">{JSON.stringify(props.appState.dataFromBack)}</span>
            </article>
            <article className="mouse">
                <span className="label">mouse=</span>
                <span className="value">
                    ({props.appState.mouse.x},{props.appState.mouse.y})
                </span>
            </article>
        </>
    );
};
