import type { Meta, StoryObj } from '@storybook/react';
import { BtToBasket } from './BtToBasket';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

const meta: Meta<typeof BtToBasket> = {
    title: 'shared/BtToBasket',
    component: BtToBasket,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
                <BtToBasket count={0} />
            </Provider>
        );
    }
};

export const HasItems: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
                <BtToBasket count={1} />
            </Provider>
        );
    }
};
