import React from 'react';
import { LARGE_SIZE_CAPTION, MIDDLE_SIZE_CAPTION, Size, SMALL_SIZE_CAPTION } from '@src/consts';
import { Button } from '@components/Button';

interface FieldSizeProps {
    setSmall: () => void;
    setMedium: () => void;
    setLarge: () => void;
    size: Size;
}

export const FieldSize: React.FC<FieldSizeProps> = ({ setSmall, setMedium, setLarge, size }) => {
    return (
        <>
            <Button id="btSmall" onClick={setSmall} active={size === Size.SMALL}>
                {SMALL_SIZE_CAPTION}
            </Button>
            <Button id="btMedium" onClick={setMedium} active={size === Size.MIDDLE}>
                {MIDDLE_SIZE_CAPTION}
            </Button>
            <Button id="btLarge" onClick={setLarge} active={size === Size.LARGE}>
                {LARGE_SIZE_CAPTION}
            </Button>
        </>
    );
};
