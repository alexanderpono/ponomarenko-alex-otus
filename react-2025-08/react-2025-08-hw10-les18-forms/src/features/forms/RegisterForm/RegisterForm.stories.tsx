import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RegisterForm } from './RegisterForm';

const meta: Meta<typeof RegisterForm> = {
    title: 'features/RegisterForm',
    component: RegisterForm,
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
            <RegisterForm
                initialValues={{ login: '', password: '', repeatPassword: '' }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
            />
        );
    }
};
