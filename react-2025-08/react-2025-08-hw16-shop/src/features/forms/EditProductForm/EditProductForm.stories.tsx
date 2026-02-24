import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EditProductForm } from './EditProductForm';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';
import { defaultProduct, Product, ProductType } from 'src/entities/Product';

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
        const ctrl = castPartialTo<IAppController>({
            onEditProductSubmit: (values: Product) => {
                console.log('onSubmit() values=', values);
            }
        });
        return (
            <Provider store={getStore()}>
                <EditProductForm
                    initialValues={{
                        ...defaultProduct,
                        photo: '',
                        price: 0,
                        name: '',
                        type: ProductType.CAR,
                        desc: ''
                    }}
                    initialErrors={{
                        id: '',
                        photo: '',
                        price: '',
                        name: '',
                        type: ProductType.CAR,
                        desc: ''
                    }}
                    ctrl={ctrl}
                />
            </Provider>
        );
    }
};

export const errors: Story = {
    render: () => {
        const ctrl = castPartialTo<IAppController>({
            onEditProductSubmit: (values: Product) => {
                console.log('onSubmit() values=', values);
            }
        });
        return (
            <Provider store={getStore()}>
                <EditProductForm
                    initialValues={{
                        ...defaultProduct,
                        photo: '',
                        price: 0,
                        name: '',
                        type: ProductType.CAR,
                        desc: ''
                    }}
                    initialErrors={{
                        id: '',
                        photo: 'image err',
                        price: 'price err',
                        name: 'name err',
                        type: 'category err',
                        desc: 'description err'
                    }}
                    ctrl={ctrl}
                />
            </Provider>
        );
    }
};
