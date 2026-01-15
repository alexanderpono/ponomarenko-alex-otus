import { Mode, Speed, speedToDelay } from '@src/consts';
import { RootState } from '@src/store';
import {
    AppState,
    getGame,
    modePlay,
    setMode,
    sleep,
    timerLoopSaga,
    watchPlaySaga,
} from '@src/store/ducks/game';
import { testSaga } from 'redux-saga-test-plan';
import { defaultAppState, generation, invert, mode, setCounter } from './game';

describe('game.saga', () => {
    test('watchPlaySaga', () => {
        const saga = testSaga(watchPlaySaga);
        const stateMock: AppState = { ...defaultAppState, mode: Mode.PLAY };
        const pausedStateMock: AppState = { ...defaultAppState, mode: Mode.PAUSE };

        const entireFirstLoop = saga
            .next()
            .take(modePlay)
            .next()
            .put(setMode(Mode.PLAY))
            .next()
            .select(getGame)
            .next(stateMock)
            .call(timerLoopSaga); //.call(timerLoopSaga) is executed because state.mode === Mode.PLAY

        const shortSecondLoop = entireFirstLoop
            .next()
            .take(modePlay)
            .next()
            .put(setMode(Mode.PLAY))
            .next()
            .select(getGame)
            .next(pausedStateMock); //.call(timerLoopSaga) is skipped because state.mode !== Mode.PLAY

        shortSecondLoop
            .take(modePlay) //entered 3nd loop;
            .finish();
    });

    test('timerLoop', () => {
        const saga = testSaga(timerLoopSaga);
        const stateMock: AppState = { ...defaultAppState, mode: Mode.PLAY, speed: Speed.SLOW };
        const exitStateMock: AppState = { ...defaultAppState, mode: Mode.PAUSE, speed: Speed.SLOW };
        const delay = speedToDelay[stateMock.speed];

        const enterWhile = saga.next().select(getGame).next(stateMock);
        const entireFirstLoop = enterWhile
            .put(setCounter(1))
            .next()
            .put(generation())
            .next()
            .call(sleep, delay)
            .next()
            .select(getGame)
            .next(stateMock);

        const reenteredWhile = entireFirstLoop;

        const entireSecondLoop = reenteredWhile
            .put(setCounter(1))
            .next()
            .put(generation())
            .next()
            .call(sleep, delay)
            .next()
            .select(getGame)
            .next(exitStateMock);

        const exitedWhile = entireSecondLoop;
        const timerLoopSagaIsDone = exitedWhile.isDone();
        timerLoopSagaIsDone.finish();
    });

    describe('sleep()', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        test.each`
            timeout
            ${1500}
            ${2000}
            ${5000}
        `('sleep($timeout) resolves after $timeout msec', ({ timeout }) => {
            const sleepPromise = sleep(timeout);
            jest.runOnlyPendingTimers();
            expect(sleepPromise).resolves.toBe(undefined);
        });

        afterEach(() => {
            jest.useRealTimers();
        });
    });

    test('getGame(s) returns s.game', () => {
        const gameState = { ...defaultAppState };
        const state: RootState = { game: gameState };
        expect(getGame(state)).toBe(gameState);
    });

    describe('modePlay()', () => {
        test.each`
            action              | testName              | expected
            ${mode(Mode.PLAY)}  | ${'mode(Mode.PLAY)'}  | ${true}
            ${mode(Mode.PAUSE)} | ${'mode(Mode.PAUSE)'} | ${false}
            ${invert(1)}        | ${'invert(1)'}        | ${false}
        `('it returns $expected from $testName', ({ action, expected }) => {
            expect(modePlay(action)).toBe(expected);
        });
    });
});
