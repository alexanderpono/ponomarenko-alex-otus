import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import React from 'react';

const meta: Meta<typeof Modal> = {
    title: 'Modal',
    component: Modal,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
    args: {
        visible: true,
        children: (
            <>
                <h2>Это модальное окно</h2>
                <p>Здесь находится содержимое вашего окна.</p>
            </>
        )
    }
};

export const NotVisible: Story = {
    args: {
        visible: false
    }
};
