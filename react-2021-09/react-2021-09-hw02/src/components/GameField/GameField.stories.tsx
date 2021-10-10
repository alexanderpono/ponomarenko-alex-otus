import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { GameField } from './GameField';

export default {
    title: 'GameField',
    decorators: [withKnobs],
};

export const Run = () => {
    const width = number('Width, cells', 3);
    const height = number('Height, cells', 3);
    return <GameField w={width} h={height} showAll={false} />;
};

export const ShowAll = () => {
    const width = number('Width, cells', 3);
    const height = number('Height, cells', 3);
    return <GameField w={width} h={height} showAll={true} />;
};
