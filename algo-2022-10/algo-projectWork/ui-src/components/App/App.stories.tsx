import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { App } from './App';

export default {
    title: 'App',
    decorators: [withKnobs]
};

export const App1 = () => {
    return <App />;
};
