import type { Meta, StoryObj } from '@storybook/react';
import { ModalStarter } from './ModalStarter';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

const meta: Meta<typeof ModalStarter> = {
    title: 'shared/ModalStarter',
    component: ModalStarter,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dynamic: Story = {
    render: () => {
        return (
            <Provider store={getStore()}>
                <ModalStarter />
            </Provider>
        );
    }
};
