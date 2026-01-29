import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
    render: () => {
        return (
            <LoginForm
                initialValues={{ login: '', password: '' }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
            />
        );
    }
};
