import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Slides } from './Slides';

export default {
    title: 'Slides',
    decorators: [withKnobs]
};

export const Slides_ = () => {
    return <Slides />;
};
