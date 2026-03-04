import type { Meta, StoryObj } from '@storybook/react';
import { CartItem, CartItemProps } from './CartItem';
import { shortText } from 'src/constants/shortText';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';

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

const defaultStory: Story = {
    render: (args: CartItemProps) => {
        const ctrl = castPartialTo<IAppController>({
            onProductEditClick: () => {
                console.log('onProductEditClick()');
            },
            onPlusClick: () => {
                console.log('onPlusClick()');
            },
            onMinusClick: () => {
                console.log('onMinusClick()');
            }
        });
        return (
            <Provider store={getStore()}>
                <CartItem
                    image={args.image}
                    count={args.count}
                    price={args.price}
                    name={args.name}
                    ctrl={ctrl}
                    productId={'1'}
                />
            </Provider>
        );
    }
};

export const NoImage1: Story = {
    ...defaultStory,
    args: {
        image: '',
        count: 1,
        price: 1999,
        name: shortText
    }
};

export const Cat2: Story = {
    ...defaultStory,
    args: {
        image: 'cat.jpg',
        count: 2,
        price: 1999,
        name: shortText
    }
};
