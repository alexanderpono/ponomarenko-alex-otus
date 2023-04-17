import React from 'react';

interface AppControllerForUI {
    onBtStartClick: () => void;
    onBtClearClick: () => void;
}

interface AppUIProps {
    ctrl: AppControllerForUI;
    title: string;
    onMount: () => void;
}

export const AppUI: React.FC<AppUIProps> = ({ ctrl, title, onMount }) => {
    React.useEffect(() => {
        onMount();
    }, []);

    return (
        <div>
            <h1>{title}</h1>
            <canvas height="320" width="720" id="AppUI-canvas"></canvas>
            <div>
                <button onClick={ctrl.onBtStartClick}>Start</button>
                <button onClick={ctrl.onBtClearClick}>Clear</button>
            </div>
        </div>
    );
};
