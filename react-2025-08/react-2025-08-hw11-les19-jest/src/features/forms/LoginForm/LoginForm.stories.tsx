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

export const login: Story = {
    render: () => {
        return (
            <LoginForm
                initialValues={{ login: '', password: '', repeatPassword: '' }}
                initialErrors={{ login: '', password: '', repeatPassword: '' }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
                isRegistering={false}
            />
        );
    }
};

export const loginErrors: Story = {
    render: () => {
        return (
            <LoginForm
                initialValues={{ login: '', password: '', repeatPassword: '' }}
                initialErrors={{
                    login: 'login error',
                    password: 'password error',
                    repeatPassword: 'repeatPassword error'
                }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
                isRegistering={false}
            />
        );
    }
};

export const register: Story = {
    render: () => {
        return (
            <LoginForm
                initialValues={{ login: '', password: '', repeatPassword: '' }}
                initialErrors={{ login: '', password: '', repeatPassword: '' }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
                isRegistering={true}
            />
        );
    }
};

export const registerErrors: Story = {
    render: () => {
        return (
            <LoginForm
                initialValues={{ login: '', password: '', repeatPassword: '' }}
                initialErrors={{
                    login: 'login error',
                    password: 'password error',
                    repeatPassword: 'repeatPassword error'
                }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
                isRegistering={true}
            />
        );
    }
};
