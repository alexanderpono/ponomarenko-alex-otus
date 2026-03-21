import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { UpdatePasswordForm } from './UpdatePasswordForm';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';
import { UpdatePasswordFormValues } from './UpdatePasswordForm.types';

const meta: Meta<typeof UpdatePasswordForm> = {
    title: 'features/ProfileForm',
    component: UpdatePasswordForm,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

const ctrl = castPartialTo<IAppController>({
    onUpdatePasswordSubmit: (values: UpdatePasswordFormValues) => {
        console.log('onUpdatePasswordSubmit() values=', values);
    }
});

export const defaultStory: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
                <UpdatePasswordForm
                    initialValues={{ password: 'pass', newPassword: 'newPass' }}
                    initialErrors={{ password: '', newPassword: '' }}
                    ctrl={ctrl}
                />
            </Provider>
        );
    }
};

export const errors: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
                <UpdatePasswordForm
                    initialValues={{ password: 'pass', newPassword: 'newPass' }}
                    initialErrors={{ password: 'password error', newPassword: 'newPassword error' }}
                    ctrl={ctrl}
                />
            </Provider>
        );
    }
};
