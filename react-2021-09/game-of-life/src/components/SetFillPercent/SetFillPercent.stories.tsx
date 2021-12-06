import React from 'react';
import { SetFillPercent } from './SetFillPercent';
import { action } from '@storybook/addon-actions';
import { FillPercent } from '@src/consts';

export default {
    title: 'FillPercent',
};

export const Static25 = () => {
    return (
        <SetFillPercent
            fill0={action('fill0')}
            fill25={action('fill25')}
            fill50={action('fill50')}
            fill75={action('fill75')}
            fill100={action('fill100')}
            curPercent={FillPercent.P25}
        />
    );
};

export const Static50 = () => {
    return (
        <SetFillPercent
            fill0={action('fill0')}
            fill25={action('fill25')}
            fill50={action('fill50')}
            fill75={action('fill75')}
            fill100={action('fill100')}
            curPercent={FillPercent.P50}
        />
    );
};

export const Static75 = () => {
    return (
        <SetFillPercent
            fill0={action('fill0')}
            fill25={action('fill25')}
            fill50={action('fill50')}
            fill75={action('fill75')}
            fill100={action('fill100')}
            curPercent={FillPercent.P75}
        />
    );
};

export const Static100 = () => {
    return (
        <SetFillPercent
            fill0={action('fill0')}
            fill25={action('fill25')}
            fill50={action('fill50')}
            fill75={action('fill75')}
            fill100={action('fill100')}
            curPercent={FillPercent.P100}
        />
    );
};
