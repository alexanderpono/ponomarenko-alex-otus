import React from 'react';
import { Button } from '@components/Button';
import { Speed } from '@src/consts';

interface Props {
    speed: Speed;
    setSpeed: (speed: Speed) => void;
}
export const DefineSpeed: React.FC<Props> = ({ speed, setSpeed }) => {
    const slow = () => setSpeed(Speed.SLOW);
    const medium = () => setSpeed(Speed.MEDIUM);
    const fast = () => setSpeed(Speed.FAST);
    return (
        <>
            <Button id="btSlow" onClick={slow} active={speed === Speed.SLOW}>
                slow
            </Button>
            <Button id="btMedium" onClick={medium} active={speed === Speed.MEDIUM}>
                medium
            </Button>
            <Button id="btFast" onClick={fast} active={speed === Speed.FAST}>
                fast
            </Button>
        </>
    );
};
