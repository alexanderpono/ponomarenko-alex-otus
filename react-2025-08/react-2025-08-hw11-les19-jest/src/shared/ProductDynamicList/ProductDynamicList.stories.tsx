import type { Meta, StoryObj } from '@storybook/react';
import { ProductDynamicList } from './ProductDynamicList';

const meta: Meta<typeof ProductDynamicList> = {
    title: 'shared/ProductDynamicList',
    component: ProductDynamicList,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const dynamic: Story = {
    args: {
        products: [
            {
                image: '',
                count: 0,
                price: 1999,
                name: 'Product name',
                description: 'Short description of the product'
            },
            {
                image: '',
                count: 1,
                price: 2000,
                name: 'Product name2',
                description: 'Short description 2'
            },
            {
                image: '',
                count: 2,
                price: 100,
                name: 'Product name3',
                description: 'Short description 3'
            },
            {
                image: '',
                count: 3,
                price: 101,
                name: 'Product name4',
                description: 'Short description 4'
            }
        ]
    }
};
