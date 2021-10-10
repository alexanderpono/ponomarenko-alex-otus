import React from 'react';
import { GameField } from './GameField';
import renderer from 'react-test-renderer';

interface RenderResult {
    type: string;
    children: { type: string }[];
}

describe('HelloWorld', () => {
    it('It renders 3 cells', () => {
        const snapshot = renderer
            .create(<GameField w={3} h={1} showAll={false}></GameField>)
            .toJSON() as RenderResult;
        expect(snapshot.type).toBe('section');
        expect(snapshot.children.length).toBe(3);
        expect(snapshot.children[0].type).toBe('article');
        expect(snapshot.children[1].type).toBe('article');
        expect(snapshot.children[2].type).toBe('article');
    });
});
