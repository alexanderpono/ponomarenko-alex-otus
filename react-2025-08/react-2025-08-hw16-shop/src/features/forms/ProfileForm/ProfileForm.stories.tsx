import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileForm } from './ProfileForm';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

const meta: Meta<typeof ProfileForm> = {
    title: 'features/ProfileForm',
    component: ProfileForm,
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
            <Provider store={getStore()}>
                <ProfileForm
                    initialValues={{ name: 'name', about: 'about' }}
                    initialErrors={{ name: '', about: '' }}
                    onSubmit={(values) => {
                        console.log('onSubmit() values=', values);
                    }}
                />
            </Provider>
        );
    }
};

export const errors: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
                <ProfileForm
                    initialValues={{ name: 'name', about: 'about' }}
                    initialErrors={{ name: 'name error', about: 'about error' }}
                    onSubmit={(values) => {
                        console.log('onSubmit() values=', values);
                    }}
                />
            </Provider>
        );
    }
};
