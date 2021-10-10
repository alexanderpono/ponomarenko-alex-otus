import React from 'react';
import { mount } from 'enzyme';
import { Cell } from './Cell';
import renderer from 'react-test-renderer';

interface RenderResult {
    type: string;
    children: { type: string }[];
}

describe('Cell', () => {
    it('It renders <article> using renderer cell with value=2', () => {
        const snapshot = renderer
            .create(<Cell num={2} onClick={() => {}} showContent={false} caption="2"></Cell>)
            .toJSON() as RenderResult;
        expect(snapshot.type).toBe('article');
    });

    it('It renders <article><span/></article> using renderer cell with value=2', () => {
        const snapshot = renderer
            .create(<Cell num={2} onClick={() => {}} showContent={false} caption="2"></Cell>)
            .toJSON() as RenderResult;
        expect(snapshot.children.length).toBe(1);
        expect(snapshot.children[0].type).toBe('span');
    });

    it('OnClick callback is called when cell is clicked', () => {
        const mockCallBack = jest.fn();
        const cell = mount(
            <Cell num={2} onClick={mockCallBack} showContent={false} caption="2"></Cell>
        );
        cell.find('article').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Says number of cell when clicked', () => {
        let receivedCellNumber = 0;
        const testCallBack = function (cellNumber: number) {
            receivedCellNumber = cellNumber;
        };
        const cell = mount(
            <Cell num={2} onClick={testCallBack} showContent={false} caption="2"></Cell>
        );
        cell.find('article').simulate('click');
        expect(receivedCellNumber).toEqual(2);
    });
});
