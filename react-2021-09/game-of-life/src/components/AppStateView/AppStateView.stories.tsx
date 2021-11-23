import React from 'react';
import { AppStateView } from './AppStateView';
import { defaultAppState } from '../AppStateController/appReducer';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'AppStateView',
    component: AppStateView,
} as ComponentMeta<typeof AppStateView>;
const Template: ComponentStory<typeof AppStateView> = (args) => <AppStateView {...args} />;

export const Static = Template;
Static.args = {
    appState: { ...defaultAppState, fieldWidth: 555 },
};
