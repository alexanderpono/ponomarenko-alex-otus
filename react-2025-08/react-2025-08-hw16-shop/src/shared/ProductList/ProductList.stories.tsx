import type { Meta, StoryObj } from '@storybook/react';
import { ProductList, ProductListProps } from './ProductList';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';

const meta: Meta<typeof ProductList> = {
    title: 'shared/ProductList',
    component: ProductList,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoImage: Story = {
    args: {
        products: [
            {
                id: '1',
                categoryId: '1',
                photo: '',
                price: 1999,
                name: 'Product name',
                desc: 'Short description of the product'
            },
            {
                id: '2',
                categoryId: '1',
                photo: '',
                price: 2000,
                name: 'Product name2',
                desc: 'Short description 2'
            },
            {
                id: '3',
                categoryId: '1',
                photo: '',
                price: 100,
                name: 'Product name3',
                desc: 'Short description 3'
            },
            {
                id: '4',
                categoryId: '1',
                photo: '',
                price: 101,
                name: 'Product name4',
                desc: 'Short description 4'
            }
        ]
    },
    render: (args: ProductListProps) => {
        const ctrl = castPartialTo<IAppController>({
            onProductEditClick: () => {
                console.log('onProductEditClick()');
            }
        });
        return (
            <Provider store={getStore()}>
                <ProductList products={args.products} ctrl={ctrl} />
            </Provider>
        );
    }
};
