import React from 'react';
import { mount } from 'enzyme';
import { Cell } from './Cell';
import renderer from 'react-test-renderer';
import { bool } from '@src/testFramework/lib/reducer';
import { render, screen } from '@testing-library/react';

interface RenderResult {
    type: string;
    children: { type: string }[];
    props: Record<string, string>;
}

describe('Cell', () => {
    it('It renders <article> using renderer cell with value=2', () => {
        const snapshot = renderer
            .create(
                <Cell
                    num={2}
                    onClick={() => {}}
                    alive={bool()}
                    isLeft={bool()}
                    isRight={bool()}
                    isBottom={bool()}
                ></Cell>
            )
            .toJSON() as RenderResult;
        expect(snapshot.type).toBe('article');
    });

    it('It renders <article><span/></article> using renderer cell with value=2', () => {
        const snapshot = renderer
            .create(
                <Cell
                    num={2}
                    onClick={() => {}}
                    alive={bool()}
                    isLeft={bool()}
                    isRight={bool()}
                    isBottom={bool()}
                ></Cell>
            )
            .toJSON() as RenderResult;
        expect(snapshot.children.length).toBe(1);
        expect(snapshot.children[0].type).toBe('span');
    });

    it('OnClick callback is called when cell is clicked', () => {
        const mockCallBack = jest.fn();
        const cell = mount(
            <Cell
                num={2}
                onClick={mockCallBack}
                alive={bool()}
                isLeft={bool()}
                isRight={bool()}
                isBottom={bool()}
            ></Cell>
        );
        cell.find('article').simulate('click');
        expect(mockCallBack).toBeCalledTimes(1);
    });

    it('Says number of cell when clicked', () => {
        let receivedCellNumber = 0;
        const testCallBack = function (cellNumber: number) {
            receivedCellNumber = cellNumber;
        };
        const cell = mount(
            <Cell
                num={2}
                onClick={testCallBack}
                alive={bool()}
                isLeft={bool()}
                isRight={bool()}
                isBottom={bool()}
            ></Cell>
        );
        cell.find('article').simulate('click');
        expect(receivedCellNumber).toEqual(2);
    });

    it('renders with class "cell"', () => {
        const snapshot = renderer
            .create(
                <Cell
                    num={2}
                    onClick={() => {}}
                    alive={bool()}
                    isLeft={bool()}
                    isRight={bool()}
                    isBottom={bool()}
                ></Cell>
            )
            .toJSON() as RenderResult;

        expect(snapshot.props.className.split(' ')).toEqual(expect.arrayContaining(['cell']));
    });

    it('renders with external class "show" if props.alive==true', () => {
        const snapshot = renderer
            .create(
                <Cell
                    num={2}
                    onClick={() => {}}
                    alive={true}
                    isLeft={bool()}
                    isRight={bool()}
                    isBottom={bool()}
                ></Cell>
            )
            .toJSON() as RenderResult;

        expect(snapshot.props.className.split(' ')).toEqual(expect.arrayContaining(['show']));
    });

    it('renders with inner class "show" if props.alive==true', () => {
        render(
            <Cell
                num={2}
                onClick={() => {}}
                alive={true}
                isLeft={true}
                isRight={bool()}
                isBottom={bool()}
            ></Cell>
        );
        expect(screen.queryByTestId('inner-cell')?.className).toBe('show');
    });
});
