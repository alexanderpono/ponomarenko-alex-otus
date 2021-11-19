import React from 'react';

interface Props {
    play: () => void;
    pause: () => void;
    clear: () => void;
}
export const Control: React.FC<Props> = ({ play, pause, clear }) => {
    return (
        <>
            <article className="control">
                <span className="label">control:</span>
                <button id="btPlay" onClick={play}>
                    play
                </button>
                <button id="btPause" onClick={pause}>
                    pause
                </button>
                <button id="btClear" onClick={clear}>
                    clear
                </button>
            </article>
        </>
    );
};
