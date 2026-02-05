import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EditProductForm } from './EditProductForm';

const meta: Meta<typeof EditProductForm> = {
    title: 'features/EditProductForm',
    component: EditProductForm,
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
            <EditProductForm
                initialValues={{ image: '', price: 0, name: '', category: '', description: '' }}
                initialErrors={{ image: '', price: '', name: '', category: '', description: '' }}
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
            <EditProductForm
                initialValues={{ image: '', price: 0, name: '', category: '', description: '' }}
                initialErrors={{
                    image: 'image err',
                    price: 'price err',
                    name: 'name err',
                    category: 'category err',
                    description: 'description err'
                }}
                onSubmit={(values) => {
                    console.log('onSubmit() values=', values);
                }}
            />
        );
    }
};
