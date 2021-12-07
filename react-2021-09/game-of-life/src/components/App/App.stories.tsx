import React from 'react';
import { defaultAppState } from '@src/components/AppStateManager/appReducer';
import { App } from './App';
import { action } from '@storybook/addon-actions';

export default {
    title: 'App',
};

export const Static = () => {
    return (
        <App
            appState={defaultAppState}
            invert={action('invert')}
            setSmall={action('setSmall')}
            setMedium={action('setMedium')}
            setLarge={action('setLarge')}
            clear={action('clear')}
            fill25={action('fill25')}
            fill50={action('fill50')}
            fill75={action('fill75')}
            fill100={action('fill100')}
        />
    );
};
