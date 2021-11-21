import React from 'react';
import { AppStateView } from './AppStateView';
import renderer from 'react-test-renderer';
import { defaultAppState } from '@src/components/AppStateManager/appReducer';
import { num } from '@src/testFramework/lib/reducer';

describe('AppStateView', () => {
    it('It renders field size from props.appState', () => {
        const appState = { ...defaultAppState };
        appState.fieldWidth = num();
        const testRenderer = renderer.create(<AppStateView appState={appState}></AppStateView>);

        const selector = testRenderer.root
            .findByProps({ className: 'fieldSize' })
            .findByProps({ className: 'value' });

        const childrenTexts = selector.children.map((item) => ('' + item).trim());
        expect(childrenTexts.join(' ')).toEqual(
            `[ ${appState.fieldWidth} x ${appState.fieldHeight} ]`
        );
    });
});
