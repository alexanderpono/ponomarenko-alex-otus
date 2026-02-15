import {
    createData,
    getCicledX,
    getCicledY,
    getGOLCellState,
    getInverted,
    getInvertedCellState,
    getNewField,
    randomFill,
    recreateData,
    yx,
} from './playFieldUtils';
import { CellArray, CellInfo } from '@src/types';
import { bool, num, size } from '@src/testFramework/lib/reducer';

describe('createData', () => {
    it('It creates array of size=25 from 5x5', () => {
        expect(createData(5, 5).length).toBe(25);
    });
});

describe('recreateData', () => {
    it('It creates array of size=25 from source=3x3 and size=5x5', () => {
        const srcW = 3;
        const srcH = 3;
        const srcAr = createData(srcW, srcH);
        expect(recreateData(srcAr, srcW, srcH, 5, 5).length).toBe(25);
    });

    it('It uses data of source array 3x3 when constructs 5x5', () => {
        const srcW = 3;
        const srcH = 3;
        const newW = 5;
        const newH = 5;
        const srcAr = createData(srcW, srcH);
        const rndCell = (): CellInfo => (bool() ? CellInfo.alive : CellInfo.dead);
        const clickedAr = srcAr.map((cell: CellInfo) => rndCell());
        const recreatedAr = recreateData(clickedAr, srcW, srcH, newW, newH);

        for (let y = 0; y < srcH; y++) {
            for (let x = 0; x < srcW; x++) {
                const newVisibleVal = recreatedAr[yx(y, x, newW)];
                const oldVisibleVal = clickedAr[yx(y, x, srcW)];
                expect(`(${y},${x}) ${newVisibleVal}`).toBe(`(${y},${x}) ${oldVisibleVal}`);
            }
        }
    });

    it('It uses data of source array 5x5 when constructs 3x3', () => {
        const srcW = 5;
        const srcH = 5;
        const newW = 3;
        const newH = 3;
        const srcAr = createData(srcW, srcH);
        const rndCell = (): CellInfo => (bool() ? CellInfo.alive : CellInfo.dead);
        const clickedAr = srcAr.map((cell: CellInfo) => rndCell());
        const recreatedAr = recreateData(clickedAr, srcW, srcH, newW, newH);

        for (let y = 0; y < newH; y++) {
            for (let x = 0; x < newW; x++) {
                const newVisibleVal = recreatedAr[yx(y, x, newW)];
                const oldVisibleVal = clickedAr[yx(y, x, srcW)];
                expect(`(${y},${x}) ${newVisibleVal}`).toBe(`(${y},${x}) ${oldVisibleVal}`);
            }
        }
    });
});

describe('randomFill', () => {
    it('insert alive cells into array from probability 25%', () => {
        const srcW = size(5) + 1;
        const srcH = size(5) + 1;
        const expectedAliveNumber = Math.floor(srcW * srcH * 0.25);
        const ar: CellArray = {
            width: srcW,
            height: srcH,
            data: createData(srcW, srcH),
        };
        const randomAr = randomFill(ar, 0.25);
        const aliveNumber = randomAr.data.filter(
            (cell: CellInfo) => cell === CellInfo.alive
        ).length;
        expect(aliveNumber).toBe(expectedAliveNumber);
    });

    it('insert alive cells into array from probability 50%', () => {
        const srcW = size(5) + 1;
        const srcH = size(5) + 1;
        const expectedAliveNumber = Math.floor(srcW * srcH * 0.5);
        const ar: CellArray = {
            width: srcW,
            height: srcH,
            data: createData(srcW, srcH),
        };
        const randomAr = randomFill(ar, 0.5);
        const aliveNumber = randomAr.data.filter(
            (cell: CellInfo) => cell === CellInfo.alive
        ).length;
        expect(aliveNumber).toBe(expectedAliveNumber);
    });

    it('insert alive cells into array from probability 75%', () => {
        const srcW = size(5) + 1;
        const srcH = size(5) + 1;
        const expectedAliveNumber = Math.floor(srcW * srcH * 0.75);
        const ar: CellArray = {
            width: srcW,
            height: srcH,
            data: createData(srcW, srcH),
        };
        const randomAr = randomFill(ar, 0.75);
        const aliveNumber = randomAr.data.filter(
            (cell: CellInfo) => cell === CellInfo.alive
        ).length;
        expect(aliveNumber).toBe(expectedAliveNumber);
    });

    it('throws if probability <0', () => {
        const srcW = size(5);
        const srcH = size(5);
        const ar: CellArray = {
            width: srcW,
            height: srcH,
            data: createData(srcW, srcH),
        };
        const rndProbability = -1 * Math.random() - 0.1;
        expect(() => randomFill(ar, rndProbability)).toThrow();
    });

    it('throws if probability >1', () => {
        const srcW = size(5);
        const srcH = size(5);
        const ar: CellArray = {
            width: srcW,
            height: srcH,
            data: createData(srcW, srcH),
        };
        const rndProbability = 1 + Math.random();
        expect(() => randomFill(ar, rndProbability)).toThrow();
    });
});

describe('getInverted', () => {
    test('returns CellInfo.dead from CellInfo.alive', () => {
        expect(getInverted(CellInfo.alive)).toBe(CellInfo.dead);
    });

    test('returns CellInfo.alive from CellInfo.dead', () => {
        expect(getInverted(CellInfo.dead)).toBe(CellInfo.alive);
    });
});

describe('getCicledX', () => {
    const rndWidth = num();
    const rndBaseX = size(rndWidth);

    test.each`
        x                      | width       | testName                                          | expected
        ${rndBaseX}            | ${rndWidth} | ${'returns x if (0 <= x <= width-1)'}             | ${rndBaseX}
        ${rndBaseX + rndWidth} | ${rndWidth} | ${'returns x-width if (width <= x <= 2*width-1)'} | ${rndBaseX}
        ${rndBaseX - rndWidth} | ${rndWidth} | ${'returns x+width if (-width <= x < 0)'}         | ${rndBaseX}
        ${0}                   | ${rndWidth} | ${'returns 0 from 0'}                             | ${0}
        ${1}                   | ${rndWidth} | ${'returns 1 from 1'}                             | ${1}
        ${-1}                  | ${rndWidth} | ${'returns width-1 from -1'}                      | ${rndWidth - 1}
        ${rndWidth - 1}        | ${rndWidth} | ${'returns width-1 from width-1'}                 | ${rndWidth - 1}
        ${rndWidth}            | ${rndWidth} | ${'returns 0 from width'}                         | ${0}
        ${rndWidth + 1}        | ${rndWidth} | ${'returns 1 from width + 1'}                     | ${1}
        ${-rndWidth - 1}       | ${rndWidth} | ${'returns width - 1 from (-width - 1)'}          | ${rndWidth - 1}
    `('$testName', ({ x, width, expected }) => {
        const ar: CellArray = { data: [], width: width, height: num() };

        expect(getCicledX(ar, x)).toBe(expected);
    });
});

describe('getCicledY', () => {
    const rndHeight = num();
    const rndBaseY = size(rndHeight);

    test.each`
        y                       | height       | testName                                             | expected
        ${rndBaseY}             | ${rndHeight} | ${'returns y if (0 <= y <= height-1)'}               | ${rndBaseY}
        ${rndBaseY + rndHeight} | ${rndHeight} | ${'returns y-height if (height <= y <= 2*height-1)'} | ${rndBaseY}
        ${rndBaseY - rndHeight} | ${rndHeight} | ${'returns y+height if (-height <= y < 0)'}          | ${rndBaseY}
        ${0}                    | ${rndHeight} | ${'returns 0 from 0'}                                | ${0}
        ${1}                    | ${rndHeight} | ${'returns 1 from 1'}                                | ${1}
        ${-1}                   | ${rndHeight} | ${'returns height-1 from -1'}                        | ${rndHeight - 1}
        ${rndHeight - 1}        | ${rndHeight} | ${'returns height-1 from height-1'}                  | ${rndHeight - 1}
        ${rndHeight}            | ${rndHeight} | ${'returns 0 from height'}                           | ${0}
        ${rndHeight + 1}        | ${rndHeight} | ${'returns 1 from height + 1'}                       | ${1}
        ${-rndHeight - 1}       | ${rndHeight} | ${'returns height - 1 from (-height - 1)'}           | ${rndHeight - 1}
    `('$testName', ({ y, height, expected }) => {
        const ar: CellArray = { data: [], width: num(), height: height };

        expect(getCicledY(ar, y)).toBe(expected);
    });
});

describe('getInvertedCellState', () => {
    const rndCellState = (): CellInfo => {
        const b = bool();
        return b ? CellInfo.alive : CellInfo.dead;
    };
    const r = rndCellState;
    it('returns alive from dead', () => {
        expect(getInvertedCellState(r(), r(), r(), r(), CellInfo.dead, r(), r(), r(), r())).toBe(
            CellInfo.alive
        );
    });

    it('returns dead from alive', () => {
        expect(getInvertedCellState(r(), r(), r(), r(), CellInfo.alive, r(), r(), r(), r())).toBe(
            CellInfo.dead
        );
    });
});

const rndCellState = (): CellInfo => {
    const b = bool();
    return b ? CellInfo.alive : CellInfo.dead;
};

describe('getInvertedCellState', () => {
    const r = rndCellState;
    it('returns alive from dead', () => {
        expect(getInvertedCellState(r(), r(), r(), r(), CellInfo.dead, r(), r(), r(), r())).toBe(
            CellInfo.alive
        );
    });

    it('returns dead from alive', () => {
        expect(getInvertedCellState(r(), r(), r(), r(), CellInfo.alive, r(), r(), r(), r())).toBe(
            CellInfo.dead
        );
    });
});

describe('getNewField', () => {
    it('calls calculator', () => {
        const calculator = jest.fn();
        const srcAr: CellArray = {
            width: 2,
            height: 2,
            data: [CellInfo.dead, CellInfo.dead, CellInfo.dead, CellInfo.dead],
        };
        getNewField(srcAr, calculator);
        expect(calculator).toHaveBeenCalled();
    });

    it('converts all cells from alive into dead', () => {
        const srcAr: CellArray = {
            width: 2,
            height: 2,
            data: [CellInfo.dead, CellInfo.dead, CellInfo.dead, CellInfo.dead],
        };
        expect(getNewField(srcAr, getInvertedCellState)).toEqual({
            width: 2,
            height: 2,
            data: [CellInfo.alive, CellInfo.alive, CellInfo.alive, CellInfo.alive],
        });
    });
});

describe('getGOLCellState', () => {
    test.each`
        abcdfghi       | expected          | about
        ${'000000000'} | ${CellInfo.dead}  | ${'remains dead'}
        ${'111101111'} | ${CellInfo.dead}  | ${'remains dead'}
        ${'111111111'} | ${CellInfo.dead}  | ${'dies of overcrouding'}
        ${'111000000'} | ${CellInfo.alive} | ${'births'}
        ${'000101100'} | ${CellInfo.alive} | ${'births'}
        ${'010110010'} | ${CellInfo.alive} | ${'remains alive'}
        ${'010100010'} | ${CellInfo.alive} | ${'births'}
        ${'010110010'} | ${CellInfo.alive} | ${'remains alive'}
        ${'010010010'} | ${CellInfo.dead}  | ${'dies of loneliness'}
        ${'010010000'} | ${CellInfo.dead}  | ${'dies of loneliness'}
        ${'000010000'} | ${CellInfo.dead}  | ${'dies of loneliness'}
    `('returns $expected ($about) from $abcdfghi', ({ abcdfghi, expected }) => {
        const toCellInfo = (num: string) => (num === '1' ? CellInfo.alive : CellInfo.dead);
        const a = toCellInfo(abcdfghi[0]);
        const b = toCellInfo(abcdfghi[1]);
        const c = toCellInfo(abcdfghi[2]);
        const d = toCellInfo(abcdfghi[3]);
        const e = toCellInfo(abcdfghi[4]);
        const f = toCellInfo(abcdfghi[5]);
        const g = toCellInfo(abcdfghi[6]);
        const h = toCellInfo(abcdfghi[7]);
        const i = toCellInfo(abcdfghi[8]);

        expect(getGOLCellState(a, b, c, d, e, f, g, h, i)).toBe(expected);
    });
});
