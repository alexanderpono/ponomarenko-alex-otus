import React from 'react';
import { FieldSize } from '.';
import { action } from '@storybook/addon-actions';
import { Size } from '@src/consts';

export default {
    title: 'FieldSize',
};

export const Small = () => {
    return (
        <FieldSize
            setSmall={action('setSmall')}
            setMedium={action('setMedium')}
            setLarge={action('setLarge')}
            size={Size.SMALL}
        />
    );
};

export const Medium = () => {
    return (
        <FieldSize
            setSmall={action('setSmall')}
            setMedium={action('setMedium')}
            setLarge={action('setLarge')}
            size={Size.MIDDLE}
        />
    );
};

export const Large = () => {
    return (
        <FieldSize
            setSmall={action('setSmall')}
            setMedium={action('setMedium')}
            setLarge={action('setLarge')}
            size={Size.LARGE}
        />
    );
};
