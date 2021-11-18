import React from 'react';

interface FieldSizeProps {
    fill0: () => void;
    fill25: () => void;
    fill50: () => void;
    fill75: () => void;
    fill100: () => void;
}
export const FlllPercent: React.FC<FieldSizeProps> = ({
    fill0,
    fill25,
    fill50,
    fill75,
    fill100,
}) => {
    return (
        <>
            <span>fill percent: </span>
            <button id="btFill0" onClick={fill0}>
                0%
            </button>
            <button id="btFill25" onClick={fill25}>
                25%
            </button>
            <button id="btFill50" onClick={fill50}>
                50%
            </button>
            <button id="btFill75" onClick={fill75}>
                75%
            </button>
            <button id="btFill100" onClick={fill100}>
                100%
            </button>
        </>
    );
};
