import React from 'react';

interface Ctrl {
    onBtToStartClick: () => void;
    onBtPrevClick: () => void;
    onBtNextClick: () => void;
    onBtNextJumpClick: () => void;
    onBtToFinishClick: () => void;
    onMaxStepChange: (evt) => void;
}
interface PathControlsProps {
    ctrl: Ctrl;
    maxCalcStep: number;
}

export const PathControls: React.FC<PathControlsProps> = ({ ctrl, maxCalcStep }) => {
    return (
        <div>
            <button onClick={ctrl.onBtToStartClick} className="appButton">
                |&lt;
            </button>
            <button onClick={ctrl.onBtPrevClick} className="appButton">
                &lt;
            </button>
            <button onClick={ctrl.onBtNextClick} className="appButton">
                &gt;
            </button>
            <button onClick={ctrl.onBtNextJumpClick} className="appButton">
                &gt;&gt;
            </button>
            <button onClick={ctrl.onBtToFinishClick} className="appButton">
                &gt;|
            </button>
            <label className="stepSlider">
                <span className="stepNo">{maxCalcStep}</span>
                <span className="slider">
                    <input
                        type="range"
                        name="volume"
                        min="0"
                        max="200"
                        value={maxCalcStep}
                        onChange={ctrl.onMaxStepChange}
                    />
                </span>
            </label>
        </div>
    );
};
