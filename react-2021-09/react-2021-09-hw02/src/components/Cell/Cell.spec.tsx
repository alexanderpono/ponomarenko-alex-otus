import React from 'react';
import { mount } from 'enzyme';
import { Cell } from './Cell';
import renderer from 'react-test-renderer';

describe('Cell', () => {
    it('It renders <article> using renderer cell with value=2', () => {
        const snapshot = renderer.create(<Cell num={2} showContent={false}></Cell>).toJSON();
        expect(snapshot.type).toBe('article');
    });

    it('It renders <article><span/></article> using renderer cell with value=2', () => {
        const snapshot = renderer.create(<Cell num={2} showContent={false}></Cell>).toJSON();
        expect(snapshot.children.length).toBe(1);
        expect(snapshot.children[0].type).toBe('span');
    });

    it('OnClick callback is called when cell is clicked', () => {
        const mockCallBack = jest.fn();
        const cell = mount(<Cell num={2} onClick={mockCallBack} showContent={false}></Cell>);
        cell.find('article').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Says number of cell and says show state when cell is clicked', () => {
        let receivedCellNumber = 0;
        let receivedCellState = null;
        const testCallBack = function (cellNumber: number, newState: boolean) {
            receivedCellNumber = cellNumber;
            receivedCellState = newState;
        };
        const cell = mount(<Cell num={2} onClick={testCallBack} showContent={false}></Cell>);
        cell.find('article').simulate('click');
        expect(receivedCellNumber).toEqual(2);
        expect(receivedCellState).toEqual(true);

        cell.find('article').simulate('click');
        expect(receivedCellNumber).toEqual(2);
        expect(receivedCellState).toEqual(false);
    });

    it('sets class "show" for inner Span after cell is clicked', () => {
        const cell = mount(<Cell num={2} showContent={false}></Cell>);
        cell.find('article').simulate('click');

        expect(cell.find('span').length).toEqual(1);
        const props = cell.find('span').props();
        expect(typeof props.className !== 'undefined');
        const className = props.className || '';
        expect(className.indexOf('show') >= 0).toBe(true);
    });

    it('does not set class "show" for inner Span after cell is clicked twice', () => {
        const cell = mount(<Cell num={2} showContent={false}></Cell>);
        cell.find('article').simulate('click');
        cell.find('article').simulate('click');

        expect(cell.find('span').length).toEqual(1);
        const props = cell.find('span').props();
        expect(typeof props.className !== 'undefined');
        const className = props.className || '';
        expect(className.indexOf('show') >= 0).toBe(false);
    });
});
