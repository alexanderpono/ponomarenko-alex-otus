import React from 'react';
import { AppStateManager } from './AppStateManager';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { str } from '@src/testFramework/lib/reducer';
import {
    LARGE_SIZE_CAPTION,
    MIDDLE_SIZE_CAPTION,
    Mode,
    Size,
    sizeToWH,
    SMALL_SIZE_CAPTION,
    Speed,
} from '@src/consts';
import { StorageService } from '@src/StorageService';
import { Store } from 'redux';
import { AppActions, AppState, defaultAppState, replaceState } from '@src/store/ducks/game';
import { createMockStore } from '@src/testFramework/lib/store';

describe('AppStateManager', () => {
    const clearBoth = 1;
    let storage: StorageService;
    let store: Store;

    beforeEach(() => {
        const storageMock = {
            state: defaultAppState,

            setState(state: AppState) {
                this.state = state;
            },

            getState(): AppState {
                if (this.state) {
                    return this.state;
                }
                return defaultAppState;
            },

            loadState: (): Promise<AppState> => {
                return new Promise((resolve, reject) => resolve(defaultAppState));
            },

            saveState: (): Promise<void> => Promise.resolve(),
        };
        storage = storageMock as StorageService;

        store = createMockStore();

        jest.useFakeTimers();
    });

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
        const { container, unmount } = render(<AppStateManager storage={storage} store={store} />);
        const caption = screen.getByText('Game of life');
        expect(caption).toBeInTheDocument();
        unmount();
        expect(container.innerHTML).toBe('');
    });

    describe('parameterized tests', () => {
        test.each`
            clickAt                | testName                                              | sizeId
            ${SMALL_SIZE_CAPTION}  | ${'renders field of size 5x5 on click at "small"'}    | ${Size.SMALL}
            ${MIDDLE_SIZE_CAPTION} | ${'renders field of size 10x10 on click at "medium"'} | ${Size.MIDDLE}
            ${LARGE_SIZE_CAPTION}  | ${'renders field of size 20x15 on click at "large"'}  | ${Size.LARGE}
        `('$testName', ({ clickAt, sizeId }) => {
            render(<AppStateManager storage={storage} store={store} />);

            const input = screen.getByLabelText('Enter your name:');
            userEvent.click(input);
            userEvent.type(input, str());
            userEvent.click(screen.getByText('Start'));

            userEvent.click(screen.getByText(clickAt));
            const grid = screen.getByRole('grid');
            expect(grid.children.length).toBe(
                sizeToWH[sizeId as Size].w * sizeToWH[sizeId as Size].h + clearBoth
            );
        });
    });

    it('inverts a cell after click', () => {
        const getCellIsAlive = (cell: Element) => {
            const classes = [...cell.children[0].classList];
            const cellIsVisible = classes.filter((s) => s === 'show').length === 1;
            return cellIsVisible;
        };

        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        const grid = screen.getByRole('grid');
        const firstCell = grid.children[0];
        const startCellIsAlive = getCellIsAlive(firstCell);
        userEvent.click(firstCell);
        const newCellIsAlive = getCellIsAlive(firstCell);

        expect(newCellIsAlive).toBe(!startCellIsAlive);
    });

    it('allows to click submit-button at LoginForm', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const rndName = str();
        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, rndName);
        userEvent.click(screen.getByText('Start'));
    });

    it('allows to click gameSpeed-medium-button', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        const bt = screen.getByText('medium');
        userEvent.click(bt);

        expect(store.getState().game.speed).toBe(Speed.MEDIUM);
    });

    it('clears all cells after click at clear-button', () => {
        const getCellIsAlive = (cell: Element) => {
            const classes = [...cell.children[0].classList];
            const cellIsVisible = classes.filter((s) => s === 'show').length === 1;
            return cellIsVisible;
        };

        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        userEvent.click(screen.getByText('clear'));
        const grid = screen.getByRole('grid');
        const cells = [...grid.children].filter((cell: Element) => cell.tagName === 'ARTICLE');
        const aliveCells = cells.filter((cell: Element) => getCellIsAlive(cell));

        expect(aliveCells.length).toBe(0);
    });

    it('updates grid after click at fill-25%-button', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('25%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
    });

    it('updates grid after click at fill-50%-button', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('50%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
    });

    it('updates grid after click at fill-75%-button', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('75%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
    });

    it('updates grid after click at fill-100%-button', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        const aliveIdsBefore = getIdsOfAliveCells();
        userEvent.click(screen.getByText('100%'));
        const aliveIdsAfter = getIdsOfAliveCells();

        expect(aliveIdsBefore).not.toEqual(aliveIdsAfter);
    });

    it('hides the grid after click at "logout"', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));
        userEvent.click(screen.getByText('Logout'));

        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });

    it('switches UI to "login" mode after .componentDidMount() if props.storage.getState() === null', () => {
        const badState = null as unknown as AppState;
        const storageMock = {
            state: badState,
            setState(state: AppState) {
                this.state = state;
            },
            getState(): AppState {
                if (this.state) {
                    return this.state;
                }
                return defaultAppState;
            },
            loadState: (): Promise<AppState> => {
                return new Promise((resolve, reject) => resolve(defaultAppState));
            },

            saveState: (): Promise<void> => Promise.resolve(),
        };
        render(<AppStateManager storage={storageMock} store={store} />);

        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });

    it('sets game.state.mode=Mode.PLAY after click at PLAY button', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        userEvent.click(screen.getByText('play'));
        expect(store.getState().game.mode).toBe(Mode.PLAY);
    });

    it('sets game.state.mode=Mode.PAUSE after click at PAUSE button', () => {
        render(<AppStateManager storage={storage} store={store} />);

        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        userEvent.click(screen.getByText('play'));
        userEvent.click(screen.getByText('pause'));
        expect(store.getState().game.mode).toBe(Mode.PAUSE);
    });

    it('calls setTimeout() after click at PLAY button', () => {
        jest.spyOn(global, 'setTimeout');
        render(<AppStateManager storage={storage} store={store} />);

        store.dispatch(replaceState(store.getState().game));
        const input = screen.getByLabelText('Enter your name:');
        userEvent.click(input);
        userEvent.type(input, str());
        userEvent.click(screen.getByText('Start'));

        userEvent.click(screen.getByText('play'));

        store.dispatch(replaceState(store.getState().game));
        jest.runOnlyPendingTimers();
        expect(setTimeout).toHaveBeenCalled();
    });

    it('dispatches loadState() after mount', () => {
        render(<AppStateManager storage={storage} store={store} />);

        expect(store.getState().game.event).toBe(AppActions.LOAD_STATE);
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
        cleanup();
    });
});
