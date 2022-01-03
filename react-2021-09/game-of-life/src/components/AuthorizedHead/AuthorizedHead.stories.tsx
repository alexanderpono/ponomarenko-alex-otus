import React from 'react';
import { AuthorizedHead } from './AuthorizedHead';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'AuthorizedHead',
    component: AuthorizedHead,
    decorators: [withKnobs],
};

export const Static = () => {
    return <AuthorizedHead userName="user123" onLogout={action('onLogout')} />;
};
