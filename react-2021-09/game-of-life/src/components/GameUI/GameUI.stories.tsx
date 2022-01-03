import React from 'react';
import { defaultAppState } from '@src/components/AppStateManager/appReducer';
import { GameUI } from './GameUI';
import { action } from '@storybook/addon-actions';
import { CellInfo } from '@src/types';

export default {
    title: 'GameUI',
};

export const Static = () => {
    const x = CellInfo.alive;
    const o = CellInfo.dead;
    const defaultStaticAppState = {
        ...defaultAppState,
        data: [o, x, x, x, o, x, o, o, o, o, o, x, x, x, o, o, o, o, o, x, o, x, x, x, o],
    };

    return <GameUI appState={defaultStaticAppState} invert={action('invert')} />;
};
