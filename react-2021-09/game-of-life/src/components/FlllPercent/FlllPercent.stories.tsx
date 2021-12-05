import React from 'react';
import { FlllPercent } from '.';
import { action } from '@storybook/addon-actions';

export default {
    title: 'FlllPercent',
};

export const Static = () => {
    return (
        <FlllPercent
            fill0={action('fill0')}
            fill25={action('fill25')}
            fill50={action('fill50')}
            fill75={action('fill75')}
            fill100={action('fill100')}
        />
    );
};
