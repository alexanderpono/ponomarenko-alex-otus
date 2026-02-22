import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LoginForm } from './LoginForm';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

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
            <Provider store={getStore()}>
                <LoginForm
                    initialValues={{ login: '', password: '', repeatPassword: '' }}
                    initialErrors={{ login: '', password: '', repeatPassword: '' }}
                    onSubmit={(values) => {
                        console.log('onSubmit() values=', values);
                    }}
                    isRegistering={false}
                />
            </Provider>
        );
    }
};

export const loginErrors: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
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
            </Provider>
        );
    }
};

export const register: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
                <LoginForm
                    initialValues={{ login: '', password: '', repeatPassword: '' }}
                    initialErrors={{ login: '', password: '', repeatPassword: '' }}
                    onSubmit={(values) => {
                        console.log('onSubmit() values=', values);
                    }}
                    isRegistering={true}
                />
            </Provider>
        );
    }
};

export const registerErrors: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
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
            </Provider>
        );
    }
};
