import React from 'react';
import { action } from '@storybook/addon-actions';
import { Cell } from './Cell';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Cell',
    component: Cell,
} as ComponentMeta<typeof Cell>;
const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Run = Template.bind({});
Run.args = {
    num: 5,
    showContent: false,
    onClick: action('clicked'),
};

export const Show = Template.bind({});
Show.args = {
    num: 4,
    showContent: true,
    onClick: action('clicked'),
};
