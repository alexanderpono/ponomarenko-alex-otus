import React from 'react';

interface Props {
    slow: () => void;
    medium: () => void;
    fast: () => void;
    speed: number;
}
export const Speed: React.FC<Props> = ({ slow, medium, fast, speed }) => {
    return (
        <>
            <article className="speed">
                <span className="label">game speed:</span>
                <button id="btSlow" onClick={slow}>
                    slow
                </button>
                <button id="btMedium" onClick={medium}>
                    medium
                </button>
                <button id="btFast" onClick={fast}>
                    fast
                </button>
                <span id="currentSpeed">{speed}</span>
            </article>
        </>
    );
};
