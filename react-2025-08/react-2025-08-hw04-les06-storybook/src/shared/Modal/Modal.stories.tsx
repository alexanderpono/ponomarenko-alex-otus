import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import React from 'react';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
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
                <h2>Modal window caption</h2>
                <p>Modal window text</p>
            </>
        )
    }
};

export const NotVisible: Story = {
    args: {
        visible: false
    }
};
