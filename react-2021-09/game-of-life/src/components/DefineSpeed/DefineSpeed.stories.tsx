import React from 'react';
import { DefineSpeed } from './DefineSpeed';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import { Speed } from '@src/consts';

export default {
    title: 'DefineSpeed',
    component: DefineSpeed,
    decorators: [withKnobs],
};

export const Static = () => {
    return (
        <DefineSpeed
            slow={action('slow')}
            medium={action('medium')}
            fast={action('fast')}
            speed={Speed.SLOW}
        />
    );
};
