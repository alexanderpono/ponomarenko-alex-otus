import React from 'react';
import { GameField } from './GameField';
import renderer from 'react-test-renderer';
import { AppActions } from '@src/components/AppStateManager/appReducer';
import { mount } from 'enzyme';
import { CellInfo } from '@src/types';

interface RenderResult {
    type: string;
    children: { type: string }[];
}

describe('GameField', () => {
    it('It renders 3 cells from data:[3 items]', () => {
        const data: CellInfo[] = [CellInfo.dead, CellInfo.dead, CellInfo.dead];
        const width = 3;
        const snapshot = renderer
            .create(
                <GameField
                    data={data}
                    onCellClick={() => {}}
                    width={width}
                    actionId={AppActions.INVERT}
                ></GameField>
            )
            .toJSON() as RenderResult;
        expect(snapshot.type).toBe('section');
        expect(snapshot.children[0].type).toBe('article');
        expect(snapshot.children[1].type).toBe('article');
        expect(snapshot.children[2].type).toBe('article');
    });

    it('It calls onCellClick(<cell id>) callback when a cell is clicked', () => {
        const mockCallBack = jest.fn();
        const data: CellInfo[] = [CellInfo.dead, CellInfo.dead, CellInfo.dead];
        const lastID = data.length - 1;
        const width = data.length;

        const wrapper = mount(
            <GameField
                data={data}
                onCellClick={mockCallBack}
                width={width}
                actionId={AppActions.INVERT}
            ></GameField>
        );
        wrapper.find('article').last().simulate('click');
        expect(mockCallBack).toHaveBeenCalledTimes(1);
        expect(mockCallBack).toHaveBeenCalledWith(lastID);
    });
});
