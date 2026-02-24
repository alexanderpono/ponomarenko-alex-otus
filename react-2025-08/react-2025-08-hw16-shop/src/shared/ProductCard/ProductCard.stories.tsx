import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard, ProductCardProps } from './ProductCard';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';
import { defaultProduct } from 'src/entities/Product';

const meta: Meta<typeof ProductCard> = {
    title: 'shared/ProductCard',
    component: ProductCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultStory: Story = {
    render: (args: ProductCardProps) => {
        const ctrl = castPartialTo<IAppController>({
            onProductEditClick: () => {
                console.log('onProductEditClick()');
            }
        });
        return (
            <Provider store={getStore()}>
                <ProductCard detailedDescription={args.detailedDescription} ctrl={ctrl} product={args.product} />
            </Provider>
        );
    }
};

export const NoImage: Story = {
    ...defaultStory,
    args: {
        product: { ...defaultProduct, price: 1999, name: 'Product name', desc: 'Short description of the product' }
    }
};

export const NoImage1: Story = {
    ...defaultStory,
    args: {
        product: {
            ...defaultProduct,
            count: 1,
            price: 1999,
            name: 'Product name',
            desc: 'Short description of the product'
        }
    }
};

export const Cat1: Story = {
    ...defaultStory,
    args: {
        product: {
            ...defaultProduct,
            photo: 'cat.jpg',
            count: 1,
            price: 1999,
            name: 'Kitty',
            desc: 'Kitty with flowers'
        }
    }
};

export const CatWithTip: Story = {
    ...defaultStory,
    args: {
        product: {
            ...defaultProduct,
            photo: 'cat.jpg',
            count: 1,
            price: 1999,
            name: 'Kitty',
            desc: 'Kitty with flowers'
        },

        detailedDescription: <span>Kitty with flowers Kitty with flowers Kitty with flowers Kitty with flowers</span>
    }
};
