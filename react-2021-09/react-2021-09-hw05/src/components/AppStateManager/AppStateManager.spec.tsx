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

    it('It renders "Game of life proto"', () => {
        const { container, unmount } = render(<AppStateManager />);
        const caption = screen.getByText('Game of life');
        expect(caption).toBeInTheDocument();
        unmount();
        expect(container.innerHTML).toBe('');
    });

    it('It renders field of size 5x5 on click at "small"', () => {
        const { unmount } = render(<AppStateManager />);
        const btSmall = screen.getByText(SMALL_SIZE_CAPTION);
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(
            sizeToWH[Size.SMALL].w * sizeToWH[Size.SMALL].h + clearBoth
        );
        unmount();
    });

    it('It renders field of size 10x10 on click at "medium"', () => {
        const { unmount } = render(<AppStateManager />);
        const btSmall = screen.getByText(MIDDLE_SIZE_CAPTION);
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(
            sizeToWH[Size.MIDDLE].w * sizeToWH[Size.MIDDLE].h + clearBoth
        );
        unmount();
    });

    it('It renders field of size 20x15 on click at "large"', () => {
        const { unmount } = render(<AppStateManager />);
        const btSmall = screen.getByText(LARGE_SIZE_CAPTION);
        userEvent.click(btSmall);
        const grid = screen.getByRole('grid');
        expect(grid.children.length).toBe(
            sizeToWH[Size.LARGE].w * sizeToWH[Size.LARGE].h + clearBoth
        );
        unmount();
    });

    it('It switch off a cell after click', () => {
        const getCellIsAlive = (cell: Element) => {
            const classes = [...cell.children[0].classList];
            const cellIsVisible = classes.filter((s) => s === 'show').length === 1;
            return cellIsVisible;
        };

        const { unmount } = render(<AppStateManager />);
        const grid = screen.getByRole('grid');
        const firstCell = grid.children[0];
        userEvent.click(firstCell);
        const cellIsAlive = getCellIsAlive(firstCell);

        expect(cellIsAlive).toBe(false);
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

    afterEach(() => {
        jest.restoreAllMocks();
        cleanup();
    });
});
