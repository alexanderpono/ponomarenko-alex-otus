import type { Meta, StoryObj } from '@storybook/react';
import { DetailedProductCard, DetailedProductCardProps } from './DetailedProductCard';
import React from 'react';
import { bigText } from 'src/constants/bigText';
import { shortText } from 'src/constants/shortText';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

const meta: Meta<typeof DetailedProductCard> = {
    title: 'shared/DetailedProductCard',
    component: DetailedProductCard,
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
    render: (args: DetailedProductCardProps) => {
        return (
            <Provider store={getStore()}>
                <DetailedProductCard
                    image={args.image}
                    count={args.count}
                    price={args.price}
                    name={args.name}
                    category={args.category}
                >
                    {args.children}
                </DetailedProductCard>
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
        name: shortText,
        children: [bigText, <h3>Additional info</h3>, bigText],
        category: shortText
    }
};

export const NoImage1: Story = {
    ...defaultStory,
    args: {
        image: '',
        count: 1,
        price: 1999,
        name: shortText,
        children: [bigText, <h3>Additional info</h3>, bigText],
        category: shortText
    }
};

export const Cat1: Story = {
    ...defaultStory,
    args: {
        image: 'cat.jpg',
        count: 1,
        price: 1999,
        name: shortText,
        children: [bigText, <h3>Additional info</h3>, bigText],
        category: shortText
    }
};
