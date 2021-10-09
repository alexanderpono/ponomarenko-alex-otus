import React from 'react';
import { AppState } from '../AppStateController/appReducer';

interface AppStateViewProps {
    appState: AppState;
}
export const AppStateView: React.FC<AppStateViewProps> = (props: AppStateViewProps) => {
    return (
        <>
            <p>fieldWidth={props.appState.fieldWidth}</p>
            <p>fieldHeight={props.appState.fieldHeight}</p>
        </>
    );
};
