import React from 'react';
import { Button } from '@components/Button';
import { Speed } from '@src/consts';

interface Props {
    slow: () => void;
    medium: () => void;
    fast: () => void;
    speed: Speed;
}
export const DefineSpeed: React.FC<Props> = ({ slow, medium, fast, speed }) => {
    return (
        <>
            <article className="speed">
                <span className="label">game speed:</span>
                <Button id="btSlow" onClick={slow} active={speed === Speed.SLOW}>
                    slow
                </Button>
                <Button id="btMedium" onClick={medium} active={speed === Speed.MEDIUM}>
                    medium
                </Button>
                <Button id="btFast" onClick={fast} active={speed === Speed.FAST}>
                    fast
                </Button>
            </article>
        </>
    );
};
