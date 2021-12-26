import React from 'react';
import { UserNameForm } from './UserNameForm';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'UserNameForm',
    component: UserNameForm,
    decorators: [withKnobs],
};

export const Static = () => {
    return (
        <BrowserRouter>
            <UserNameForm onName={action('name')} userName="" onLogout={action('onLogout')} />
        </BrowserRouter>
    );
};

export const StaticLoggedIn = () => {
    return (
        <BrowserRouter>
            <UserNameForm
                onName={action('name')}
                userName="user123"
                onLogout={action('onLogout')}
            />
        </BrowserRouter>
    );
};
