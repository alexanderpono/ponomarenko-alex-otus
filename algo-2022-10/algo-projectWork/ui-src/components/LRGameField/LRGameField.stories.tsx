import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { LRGameField } from './LRGameField';
import { GameField } from '@ui-src/GameField';

export default {
    title: 'LRGameField',
    decorators: [withKnobs]
};

export const Static = () => {
    const field = GameField.create();
    return <LRGameField field={field} />;
};
