import React from 'react';
import { AppStateController } from './AppStateController';
import { AppStateView as StateView } from './AppStateView';
import { defaultAppState } from './AppStateController/appReducer';
import { FieldSize as FieldSizeView } from './FieldSize';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'App',
    component: StateView,
} as ComponentMeta<typeof StateView>;
const Template: ComponentStory<typeof StateView> = (args) => <StateView {...args} />;

export const AppStateView = Template.bind({});
AppStateView.args = {
    appState: { ...defaultAppState, fieldWidth: 555 },
};

export const Controller = () => {
    return <AppStateController />;
};

export const FieldSize = () => {
    return (
        <FieldSizeView
            setSmall={action('setSmall')}
            setMedium={action('setMedium')}
            setLarge={action('setLarge')}
        />
    );
};
