import React from 'react';
import { LoginForm } from './LoginForm';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'LoginForm',
    component: LoginForm,
    decorators: [withKnobs],
};

export const Static = () => {
    return <LoginForm onChangeName={action('onChangeName')} />;
};
