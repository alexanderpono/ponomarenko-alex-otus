import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import React from 'react';

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

export const NoImage: Story = {
    args: {
        image: '',
        count: 0,
        price: 1999,
        name: 'Product name',
        description: 'Short description of the product'
    }
};

export const NoImage1: Story = {
    args: {
        image: '',
        count: 1,
        price: 1999,
        name: 'Product name',
        description: 'Short description of the product'
    }
};

export const Cat1: Story = {
    args: {
        image: 'cat.jpg',
        count: 1,
        price: 1999,
        name: 'Kitty',
        description: 'Kitty with flowers'
    }
};

export const CatWithTip: Story = {
    args: {
        image: 'cat.jpg',
        count: 1,
        price: 1999,
        name: 'Kitty',
        description: 'Kitty with flowers',
        detailedDescription: <span>Kitty with flowers Kitty with flowers Kitty with flowers Kitty with flowers</span>
    }
};
