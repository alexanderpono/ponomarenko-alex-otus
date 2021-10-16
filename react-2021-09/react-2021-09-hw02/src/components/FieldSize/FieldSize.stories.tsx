import React from 'react';
import { FieldSize } from '.';
import { action } from '@storybook/addon-actions';

export default {
    title: 'FieldSize',
};

export const Static = () => {
    return (
        <FieldSize
            setSmall={action('setSmall')}
            setMedium={action('setMedium')}
            setLarge={action('setLarge')}
        />
    );
};
