import React from 'react';
import { LARGE_SIZE_CAPTION, MIDDLE_SIZE_CAPTION, SMALL_SIZE_CAPTION } from '@src/consts';

interface FieldSizeProps {
    setSmall: () => void;
    setMedium: () => void;
    setLarge: () => void;
}
export const FieldSize: React.FC<FieldSizeProps> = ({ setSmall, setMedium, setLarge }) => {
    return (
        <>
            <span>field size: </span>
            <button id="btSmall" onClick={setSmall}>
                small {SMALL_SIZE_CAPTION}
            </button>
            <button id="btMedium" onClick={setMedium}>
                medium {MIDDLE_SIZE_CAPTION}
            </button>
            <button id="btLarge" onClick={setLarge}>
                large {LARGE_SIZE_CAPTION}
            </button>
        </>
    );
};
