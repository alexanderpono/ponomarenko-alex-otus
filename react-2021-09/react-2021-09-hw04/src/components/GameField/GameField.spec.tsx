import React from 'react';
import { GameField } from './GameField';
import renderer from 'react-test-renderer';
import { CELL_WIDTH } from '../Cell';
import { AppActions, CellInfo } from '../AppStateController/appReducer';
import { mount } from 'enzyme';
import { num } from '../../testFramework/lib/reducer';

interface RenderResult {
    type: string;
    children: { type: string }[];
}

describe('GameField', () => {
    it('It renders 3 cells from data:[3 items]', () => {
        const data: CellInfo[] = [
            { id: '0', visible: false },
            { id: '1', visible: false },
            { id: '2', visible: false },
        ];
        const widthPixels = 3 * CELL_WIDTH;
        const snapshot = renderer
            .create(
                <GameField
                    showAll={false}
                    data={data}
                    onCellClick={() => {}}
                    widthPixels={widthPixels}
                    actionId={AppActions.INVERT}
                ></GameField>
            )
            .toJSON() as RenderResult;
        expect(snapshot.type).toBe('section');
        expect(snapshot.children.length).toBe(3);
        expect(snapshot.children[0].type).toBe('article');
        expect(snapshot.children[1].type).toBe('article');
        expect(snapshot.children[2].type).toBe('article');
    });

    it('It calls onCellClick(<cell id>) callback when a cell is clicked', () => {
        const mockCallBack = jest.fn();
        const lastID = num();
        const data: CellInfo[] = [
            { id: '0', visible: false },
            { id: '1', visible: false },
            { id: String(lastID), visible: false },
        ];
        const widthPixels = data.length * CELL_WIDTH;

        const wrapper = mount(
            <GameField
                showAll={false}
                data={data}
                onCellClick={mockCallBack}
                widthPixels={widthPixels}
                actionId={AppActions.INVERT}
            ></GameField>
        );
        wrapper.find('article').last().simulate('click');
        expect(mockCallBack.mock.calls.length).toBe(1);
        expect(mockCallBack.mock.calls[0][0]).toBe(lastID);
    });
});
