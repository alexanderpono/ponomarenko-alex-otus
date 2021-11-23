import React from 'react';
import { AppStateView } from './AppStateView';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { defaultAppState } from '../AppStateController/appReducer';
import { num } from '../../testFramework/lib/reducer';

describe('AppStateView', () => {
    it('It renders fieldWidth from props.appState', () => {
        const appState = { ...defaultAppState };
        appState.fieldWidth = num();
        const testRenderer = renderer.create(<AppStateView appState={appState}></AppStateView>);

        const selector = testRenderer.root
            .findByProps({ className: 'fieldWidth' })
            .findByProps({ className: 'value' });
        expect(selector.children).toEqual([String(appState.fieldWidth)]);
    });

    it('It renders fieldHeight from props.appState', () => {
        const appState = { ...defaultAppState };
        appState.fieldHeight = num();
        const { container } = render(<AppStateView appState={appState}></AppStateView>);
        const heightValueItem = container.querySelector('.fieldHeight .value');
        expect(heightValueItem?.innerHTML).toBe(String(appState.fieldHeight));
    });
});
