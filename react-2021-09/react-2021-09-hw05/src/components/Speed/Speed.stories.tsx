import React from 'react';
import { Speed } from './Speed';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'Speed',
    component: Speed,
    decorators: [withKnobs],
};

export const Static = () => {
    return (
        <Speed
            slow={action('slow')}
            medium={action('medium')}
            fast={action('fast')}
            speed={number('speed', 50)}
        />
    );
};
