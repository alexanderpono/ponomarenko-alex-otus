import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';
import { shortText } from 'src/constants/shortText';

const meta: Meta<typeof CartItem> = {
    title: 'shared/CartItem',
    component: CartItem,
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

export const NoImage1: Story = {
    args: {
        image: '',
        count: 1,
        price: 1999,
        name: shortText
    }
};

export const Cat2: Story = {
    args: {
        image: 'cat.jpg',
        count: 2,
        price: 1999,
        name: shortText
    }
};
