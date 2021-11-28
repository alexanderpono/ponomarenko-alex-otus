import React from 'react';
import { Button } from './Button';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'Button',
    decorators: [withKnobs],
};

export const UseKnobs = () => {
    return <Button active={boolean('active', false)}>{text('text', 'button text')}</Button>;
};
