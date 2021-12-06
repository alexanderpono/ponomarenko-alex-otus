import React from 'react';
import { AppStateManager } from './AppStateManager';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { str } from '@src/testFramework/lib/reducer';
import {
    LARGE_SIZE_CAPTION,
    MIDDLE_SIZE_CAPTION,
    Size,
    sizeToWH,
    SMALL_SIZE_CAPTION,
} from '@src/consts';

describe('AppStateController', () => {
    const clearBoth = 1;

    const getCellIsAlive = (cell: Element) => {
        const classes = [...cell.children[0].classList];
        const cellIsVisible = classes.filter((s) => s === 'show').length === 1;
        return cellIsVisible;
    };

    const getIdsOfAliveCells = (): number[] => {
        const grid = screen.getByRole('grid');
        const cells = [...grid.children].filter((cell: Element) => cell.tagName === 'ARTICLE');
        const cellsIds = cells.map((cell: Element, index: number) =>
            getCellIsAlive(cell) ? index : -1
        );
        const aliveCellsIds = cellsIds.filter((id: number) => id >= 0);
        return aliveCellsIds;
    };

    it('renders "Game of life proto"', () => {
        const { container, unmount } = render(<AppStateManager />);
        const caption = screen.getByText('Game of life');
        expect(caption).toBeInTheDocument();
        unmount();
        expect(container.innerHTML).toBe('');
    });

    it('renders field of size 5x5 on click at "small"', () => {
        const { unmount } = render(<AppStateManager />);
        const btSmall = screen.getByText(SMALL_SIZE_CAPTION);
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(
            sizeToWH[Size.SMALL].w * sizeToWH[Size.SMALL].h + clearBoth
        );
        unmount();
    });

    it('renders field of size 10x10 on click at "medium"', () => {
        const { unmount } = render(<AppStateManager />);
        const btSmall = screen.getByText(MIDDLE_SIZE_CAPTION);
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(
            sizeToWH[Size.MIDDLE].w * sizeToWH[Size.MIDDLE].h + clearBoth
        );
        unmount();
    });

    it('renders field of size 20x15 on click at "large"', () => {
        const { unmount } = render(<AppStateManager />);
        const btSmall = screen.getByText(LARGE_SIZE_CAPTION);
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(
            sizeToWH[Size.LARGE].w * sizeToWH[Size.LARGE].h + clearBoth
        );
        unmount();
    });

    it('inverts a cell after click', () => {
        const getCellIsAlive = (cell: Element) => {
            const classes = [...cell.children[0].classList];
            const cellIsVisible = classes.filter((s) => s === 'show').length === 1;
            return cellIsVisible;
        };

        const { unmount } = render(<AppStateManager />);
        const grid = screen.getByRole('grid');
        const firstCell = grid.children[0];
        const startCellIsAlive = getCellIsAlive(firstCell);
        userEvent.click(firstCell);
        const newCellIsAlive = getCellIsAlive(firstCell);

        expect(newCellIsAlive).toBe(!startCellIsAlive);
        unmount();
    });

    it('allows to click submit-button at LoginForm', () => {
        render(<AppStateManager />);

        const rndName = str();
        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, rndName);
        userEvent.click(screen.getByText('submit'));
    });

    it('allows to click gameSpeed-slow-button', () => {
        render(<AppStateManager />);

        const bt = screen.getByText('slow');
        userEvent.click(bt);
    });

    it('clears all cells after click at clear-button', () => {
        const getCellIsAlive = (cell: Element) => {
            const classes = [...cell.children[0].classList];
            const cellIsVisible = classes.filter((s) => s === 'show').length === 1;
            return cellIsVisible;
        };

        const { unmount } = render(<AppStateManager />);
        userEvent.click(screen.getByText('clear'));
        const grid = screen.getByRole('grid');
        const cells = [...grid.children].filter((cell: Element) => cell.tagName === 'ARTICLE');
        const aliveCells = cells.filter((cell: Element) => getCellIsAlive(cell));

        expect(aliveCells.length).toBe(0);
        unmount();
    });

    it('updates grid after click at fill-25%-button', () => {
        const { unmount } = render(<AppStateManager />);

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('25%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
        unmount();
    });

    it('updates grid after click at fill-50%-button', () => {
        const { unmount } = render(<AppStateManager />);

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('50%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
        unmount();
    });

    it('updates grid after click at fill-75%-button', () => {
        const { unmount } = render(<AppStateManager />);

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('75%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
        unmount();
    });

    it('updates grid after click at fill-100%-button', () => {
        const { unmount } = render(<AppStateManager />);

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('100%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
        unmount();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        cleanup();
    });
});
