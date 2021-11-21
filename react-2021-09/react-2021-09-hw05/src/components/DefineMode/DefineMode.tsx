import React from 'react';
import { Button } from '@components/Button';
import { Mode } from '@src/consts';

interface Props {
    play: () => void;
    pause: () => void;
    mode: Mode;
}
export const DefineMode: React.FC<Props> = ({ play, pause, mode }) => {
    return (
        <>
            <Button id="btPlay" onClick={play} active={mode === Mode.PLAY}>
                play
            </Button>
            <Button id="btPause" onClick={pause} active={mode === Mode.PAUSE}>
                pause
            </Button>
        </>
    );
};
