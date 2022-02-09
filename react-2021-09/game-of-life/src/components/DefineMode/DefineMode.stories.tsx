import React from 'react';
import { DefineMode } from './DefineMode';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import { Mode } from '@src/consts';

export default {
    title: 'DefineMode',
    component: DefineMode,
    decorators: [withKnobs],
};

export const Static = () => {
    return <DefineMode setMode={action('setMode')} mode={Mode.PLAY} />;
};
