import type { Meta, StoryObj } from '@storybook/react';
import { ModalStarter } from './ModalStarter';

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

export const Dynamic: Story = {};
