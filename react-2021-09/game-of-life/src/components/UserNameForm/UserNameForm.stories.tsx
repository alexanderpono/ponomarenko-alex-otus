import React from 'react';
import { UserNameForm } from './UserNameForm';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'UserNameForm',
    component: UserNameForm,
    decorators: [withKnobs],
};

export const Static = () => {
    return <UserNameForm onName={action('name')} />;
};
