import React from 'react';
import { Button } from '@components/Button';
import { Mode } from '@src/consts';

interface Props {
    setMode: (mode: Mode) => void;
    mode: Mode;
}
export const DefineMode: React.FC<Props> = ({ setMode, mode }) => {
    const play = () => setMode(Mode.PLAY);
    const pause = () => setMode(Mode.PAUSE);

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
