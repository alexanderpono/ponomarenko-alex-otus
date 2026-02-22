import type { Meta, StoryObj } from '@storybook/react';
import { ProfileButton, ProfileButtonProps } from './ProfileButton';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from 'src/store/store';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';
import { app } from 'src/store/appReducer';

const meta: Meta<typeof ProfileButton> = {
    title: 'shared/ProfileButton',
    component: ProfileButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const login: Story = {
    args: {
        ctrl: castPartialTo<IAppController>({})
    },
    render: (args: ProfileButtonProps) => {
        getStore().dispatch(app.isUserAuthorized(false));
        return (
            <Provider store={getStore()}>
                <ProfileButton ctrl={args.ctrl} />
            </Provider>
        );
    }
};

export const logout: Story = {
    args: {
        ctrl: castPartialTo<IAppController>({})
    },
    render: (args: ProfileButtonProps) => {
        getStore().dispatch(app.isUserAuthorized(true));
        return (
            <Provider store={getStore()}>
                <ProfileButton ctrl={args.ctrl} />
            </Provider>
        );
    }
};
