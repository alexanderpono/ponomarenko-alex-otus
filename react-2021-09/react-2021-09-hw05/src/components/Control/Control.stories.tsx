import React from 'react';
import { Control } from './Control';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'Control',
    component: Control,
    decorators: [withKnobs],
};

export const Static = () => {
    return <Control play={action('play')} pause={action('pause')} clear={action('clear')} />;
};
