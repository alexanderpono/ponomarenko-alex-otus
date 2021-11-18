import React from 'react';
import { AppStateController } from './AppStateController';
import { render, screen, cleanup } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';

describe('AppStateController', () => {
    it('It renders "Game of life proto"', () => {
        fetchMock.mockIf('https://jsonplaceholder.typicode.com/todos/1', (req) => {
            return Promise.resolve('{}');
        });

        const { container, unmount } = render(<AppStateController></AppStateController>);
        const caption = screen.getByText('Game of life proto');
        expect(caption).toBeInTheDocument();
        unmount();
        expect(container.innerHTML).toBe('');
    });

    it('It renders field of size 10x10 on click at "small 10x10"', () => {
        fetchMock.mockIf('https://jsonplaceholder.typicode.com/todos/1', (req) => {
            return Promise.reject('{}');
        });

        const { unmount } = render(<AppStateController></AppStateController>);
        const btSmall = screen.getByText('small 10x10');
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(10 * 10);
        unmount();
    });

    it('It renders field of size 20x20 on click at "medium 20x20"', () => {
        fetchMock.mockIf('https://jsonplaceholder.typicode.com/todos/1', (req) => {
            return Promise.reject('{}');
        });

        const { unmount } = render(<AppStateController></AppStateController>);
        const btSmall = screen.getByText('medium 20x20');
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(20 * 20);
        unmount();
    });

    it('It renders field of size 30x30 on click at "large 30x30"', () => {
        fetchMock.mockIf('https://jsonplaceholder.typicode.com/todos/1', (req) => {
            return Promise.reject('{}');
        });

        const { unmount } = render(<AppStateController></AppStateController>);
        const btSmall = screen.getByText('large 30x30');
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(30 * 30);
        unmount();
    });

    it('It switch off a cell after click', () => {
        fetchMock.mockIf('https://jsonplaceholder.typicode.com/todos/1', (req) => {
            return Promise.reject('{}');
        });

        const getCellIsAlive = (cell: Element) => {
            const classes = [...cell.children[0].classList];
            const cellIsVisible = classes.filter((s) => s === 'show').length === 1;
            return cellIsVisible;
        };

        const { unmount } = render(<AppStateController></AppStateController>);
        const grid = screen.getByRole('grid');
        const firstCell = grid.children[0];
        userEvent.click(firstCell);
        const cellIsAlive = getCellIsAlive(firstCell);

        expect(cellIsAlive).toBe(false);
        unmount();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        cleanup();
    });
});
