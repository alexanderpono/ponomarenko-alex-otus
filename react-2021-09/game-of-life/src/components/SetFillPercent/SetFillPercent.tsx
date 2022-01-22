import React from 'react';
import { Button } from '@components/Button';
import { FillPercent } from '@src/consts';

interface FieldSizeProps {
    fill: (percent: FillPercent) => void;
    curPercent: FillPercent;
}
export const SetFillPercent: React.FC<FieldSizeProps> = ({ fill, curPercent }) => {
    const fill0 = () => fill(FillPercent.P0);
    const fill25 = () => fill(FillPercent.P25);
    const fill50 = () => fill(FillPercent.P50);
    const fill75 = () => fill(FillPercent.P75);
    const fill100 = () => fill(FillPercent.P100);
    return (
        <>
            <Button id="btFill0" onClick={fill0} active={curPercent === FillPercent.P0}>
                clear
            </Button>
            <Button id="btFill25" onClick={fill25} active={curPercent === FillPercent.P25}>
                25%
            </Button>
            <Button id="btFill50" onClick={fill50} active={curPercent === FillPercent.P50}>
                50%
            </Button>
            <Button id="btFill75" onClick={fill75} active={curPercent === FillPercent.P75}>
                75%
            </Button>
            <Button id="btFill100" onClick={fill100} active={curPercent === FillPercent.P100}>
                100%
            </Button>
        </>
    );
};
