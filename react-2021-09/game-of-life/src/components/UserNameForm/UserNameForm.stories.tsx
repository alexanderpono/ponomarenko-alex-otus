import React from 'react';
import { UserNameForm } from './UserNameForm';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'UserNameForm',
    component: UserNameForm,
    decorators: [withKnobs],
};

export const Static = () => {
    return <UserNameForm onName={action('name')} userName="" onLogout={action('onLogout')} />;
};

export const StaticLoggedIn = () => {
    return (
        <UserNameForm onName={action('name')} userName="user123" onLogout={action('onLogout')} />
    );
};
