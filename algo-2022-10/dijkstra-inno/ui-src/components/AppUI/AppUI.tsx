import React from 'react';
import { Label } from '../LRGameField';
import './style.css';

interface AppControllerForUI {
    onBtStartClick: () => void;
    onBtClearClick: () => void;
    pathClicked: () => void;
}

interface AppUIProps {
    ctrl: AppControllerForUI;
    title: string;
    onMount: () => void;
    pathChecked: boolean;
}

export const AppUI: React.FC<AppUIProps> = ({ ctrl, title, onMount, pathChecked }) => {
    React.useEffect(() => {
        onMount();
    }, []);

    const id = 'AppUI';
    return (
        <div>
            <p>{title}</p>
            <canvas height="320" width="720" id="AppUI-canvas"></canvas>
            <div>
                <button onClick={ctrl.onBtStartClick} className="appButton">
                    Start
                </button>
                <button onClick={ctrl.onBtClearClick} className="appButton">
                    Clear
                </button>
                {Label(pathChecked, ctrl.pathClicked, `${id}-path`, 'Траектория')}
            </div>
        </div>
    );
};
