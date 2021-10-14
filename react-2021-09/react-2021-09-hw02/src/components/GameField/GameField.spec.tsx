import React from 'react';
import { GameField } from './GameField';
import renderer from 'react-test-renderer';
import { CELL_WIDTH } from '../Cell';
import { CellInfo } from '../AppStateController/appReducer';

interface RenderResult {
    type: string;
    children: { type: string }[];
}

describe('GameField', () => {
    it('It renders 3 cells', () => {
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
                ></GameField>
            )
            .toJSON() as RenderResult;
        expect(snapshot.type).toBe('section');
        expect(snapshot.children.length).toBe(3);
        expect(snapshot.children[0].type).toBe('article');
        expect(snapshot.children[1].type).toBe('article');
        expect(snapshot.children[2].type).toBe('article');
    });
});
