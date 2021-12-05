import React from 'react';
import { AppStateView } from './AppStateView';
import { defaultAppState } from '@src/components/AppStateManager/appReducer';

export default {
    title: 'AppStateView',
    component: AppStateView,
};

export const Static = () => {
    return <AppStateView appState={{ ...defaultAppState, fieldWidth: 555 }} />;
};
