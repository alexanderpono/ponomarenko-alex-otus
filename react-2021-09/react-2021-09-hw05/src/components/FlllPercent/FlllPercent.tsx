import React from 'react';
import { Button } from '@components/Button';

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
            <Button id="btFill0" onClick={fill0}>
                clear
            </Button>
            <Button id="btFill25" onClick={fill25}>
                25%
            </Button>
            <Button id="btFill50" onClick={fill50}>
                50%
            </Button>
            <Button id="btFill75" onClick={fill75}>
                75%
            </Button>
            <Button id="btFill100" onClick={fill100}>
                100%
            </Button>
        </>
    );
};
