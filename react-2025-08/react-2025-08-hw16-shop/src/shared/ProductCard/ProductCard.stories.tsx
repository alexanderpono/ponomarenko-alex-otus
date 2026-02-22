import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard, ProductCardProps } from './ProductCard';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

const meta: Meta<typeof ProductCard> = {
    title: 'shared/ProductCard',
    component: ProductCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        image: {
            control: { type: 'select' },
            options: ['', 'cat.jpg']
        }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultStory: Story = {
    render: (args: ProductCardProps) => {
        return (
            <Provider store={getStore()}>
                <ProductCard
                    image={args.image}
                    count={args.count}
                    price={args.price}
                    name={args.name}
                    description={args.description}
                    detailedDescription={args.detailedDescription}
                />
            </Provider>
        );
    }
};

export const NoImage: Story = {
    ...defaultStory,
    args: {
        image: '',
        count: 0,
        price: 1999,
        name: 'Product name',
        description: 'Short description of the product'
    }
};

export const NoImage1: Story = {
    ...defaultStory,
    args: {
        image: '',
        count: 1,
        price: 1999,
        name: 'Product name',
        description: 'Short description of the product'
    }
};

export const Cat1: Story = {
    ...defaultStory,
    args: {
        image: 'cat.jpg',
        count: 1,
        price: 1999,
        name: 'Kitty',
        description: 'Kitty with flowers'
    }
};

export const CatWithTip: Story = {
    ...defaultStory,
    args: {
        image: 'cat.jpg',
        count: 1,
        price: 1999,
        name: 'Kitty',
        description: 'Kitty with flowers',
        detailedDescription: <span>Kitty with flowers Kitty with flowers Kitty with flowers Kitty with flowers</span>
    }
};
