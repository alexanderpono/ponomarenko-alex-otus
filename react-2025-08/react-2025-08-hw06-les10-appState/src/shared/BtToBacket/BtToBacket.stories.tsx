import type { Meta, StoryObj } from '@storybook/react';
import { BtToBasket } from './BtToBasket';

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
    args: {
        count: 0
    }
};

export const HasItems: Story = {
    args: {
        count: 1
    }
};
