import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileForm } from './ProfileForm';

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
            <ProfileForm
                initialValues={{ name: 'name', about: 'about' }}
                initialErrors={{ name: '', about: '' }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
            />
        );
    }
};

export const errors: Story = {
    render: () => {
        return (
            <ProfileForm
                initialValues={{ name: 'name', about: 'about' }}
                initialErrors={{ name: 'name error', about: 'about error' }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
            />
        );
    }
};
