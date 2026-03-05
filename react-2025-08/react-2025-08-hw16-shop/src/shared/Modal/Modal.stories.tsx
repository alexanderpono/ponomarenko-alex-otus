import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalProps } from './Modal';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';

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

const defaultStory: Story = {
    render: (args: ModalProps) => {
        return (
            <Provider store={getStore()}>
                <Modal visible={args.visible} handleBtCloseClick={() => null} title={'Продукт'}>
                    {args.children}
                </Modal>
            </Provider>
        );
    }
};

export const Visible: Story = {
    ...defaultStory,
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
    ...defaultStory,
    args: {
        visible: false
    }
};
