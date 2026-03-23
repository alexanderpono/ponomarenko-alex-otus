import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LoginForm } from './LoginForm';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';
import { LoginFormValues } from './LoginForm.types';

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
        const ctrl = castPartialTo<IAppController>({
            onLoginSubmit: (values: LoginFormValues) => {
                console.log('onLoginSubmit() values=', values);
            }
        });
        return (
            <Provider store={getStore()}>
                <LoginForm
                    initialValues={{ login: '', password: '', repeatPassword: '' }}
                    initialErrors={{ login: '', password: '', repeatPassword: '' }}
                    ctrl={ctrl}
                    isRegistering={false}
                />
            </Provider>
        );
    }
};

export const loginErrors: Story = {
    render: () => {
        const ctrl = castPartialTo<IAppController>({
            onLoginSubmit: (values: LoginFormValues) => {
                console.log('onLoginSubmit() values=', values);
            }
        });
        return (
            <Provider store={getStore()}>
                <LoginForm
                    initialValues={{ login: '', password: '', repeatPassword: '' }}
                    initialErrors={{
                        login: 'login error',
                        password: 'password error',
                        repeatPassword: 'repeatPassword error'
                    }}
                    ctrl={ctrl}
                    isRegistering={false}
                />
            </Provider>
        );
    }
};

export const register: Story = {
    render: () => {
        const ctrl = castPartialTo<IAppController>({
            onLoginSubmit: (values: LoginFormValues) => {
                console.log('onLoginSubmit() values=', values);
            }
        });
        return (
            <Provider store={getStore()}>
                <LoginForm
                    initialValues={{ login: '', password: '', repeatPassword: '' }}
                    initialErrors={{ login: '', password: '', repeatPassword: '' }}
                    ctrl={ctrl}
                    isRegistering={true}
                />
            </Provider>
        );
    }
};

export const registerErrors: Story = {
    render: () => {
        const ctrl = castPartialTo<IAppController>({
            onLoginSubmit: (values: LoginFormValues) => {
                console.log('onLoginSubmit() values=', values);
            }
        });
        return (
            <Provider store={getStore()}>
                <LoginForm
                    initialValues={{ login: '', password: '', repeatPassword: '' }}
                    initialErrors={{
                        login: 'login error',
                        password: 'password error',
                        repeatPassword: 'repeatPassword error'
                    }}
                    ctrl={ctrl}
                    isRegistering={true}
                />
            </Provider>
        );
    }
};
