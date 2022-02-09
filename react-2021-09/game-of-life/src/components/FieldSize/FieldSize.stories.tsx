import React from 'react';
import { FieldSize } from './FieldSize';
import { action } from '@storybook/addon-actions';
import { Size } from '@src/consts';

export default {
    title: 'FieldSize',
};

export const Small = () => {
    return <FieldSize setSize={action('setSize')} size={Size.SMALL} />;
};

export const Medium = () => {
    return <FieldSize setSize={action('setSize')} size={Size.MIDDLE} />;
};

export const Large = () => {
    return <FieldSize setSize={action('setSize')} size={Size.LARGE} />;
};
