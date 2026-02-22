import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EditProductForm } from './EditProductForm';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

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
            <Provider store={getStore()}>
                <EditProductForm
                    initialValues={{ image: '', price: 0, name: '', category: '', description: '' }}
                    initialErrors={{ image: '', price: '', name: '', category: '', description: '' }}
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
            </Provider>
        );
    }
};
