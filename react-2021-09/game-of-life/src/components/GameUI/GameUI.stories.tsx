import React from 'react';
import { defaultAppState, replaceState } from '@src/store/ducks/game';
import { GameUI } from './GameUI';
import { action } from '@storybook/addon-actions';
import { CellInfo } from '@src/types';
import { Provider } from 'react-redux';
import { createMockStore } from '@src/testFramework/lib/store';

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

    const mockStore = createMockStore();
    mockStore.dispatch(replaceState(defaultStaticAppState));

    return (
        <Provider store={mockStore}>
            <GameUI invert={action('invert')} />
        </Provider>
    );
};
