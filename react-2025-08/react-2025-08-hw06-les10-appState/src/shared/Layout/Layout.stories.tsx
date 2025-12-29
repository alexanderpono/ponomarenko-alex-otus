import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';
import React from 'react';
import { bigText } from 'src/constants/bigText';
import Modal from '../Modal/Modal';

const meta: Meta<typeof Layout> = {
    title: 'shared/Layout',
    component: Layout,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LayoutWithScroll: Story = {
    args: {
        children: (
            <>
                {bigText}
                {bigText}
                {bigText}
            </>
        )
    }
};

export const LayoutWithScrollAndModal: Story = {
    args: {
        children: (
            <>
                {bigText}
                {bigText}
                {bigText}
                <Modal visible={true}>
                    <h2>Modal window caption</h2>
                    <p>Modal window text</p>
                </Modal>
            </>
        )
    }
};
