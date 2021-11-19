import { createData, recreateData, yx } from './playFieldUtils';
import { CellInfo } from './playField.types';
import { bool } from '@src/testFramework/lib/reducer';

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
        const clickedAr = srcAr.map((cell: CellInfo) => {
            return { ...cell, visible: bool() };
        });
        const newAr = recreateData(clickedAr, srcW, srcH, newW, newH);

        for (let y = 0; y < srcH; y++) {
            for (let x = 0; x < srcW; x++) {
                const newVisibleVal = newAr[yx(y, x, newW)].visible;
                const oldVisibleVal = clickedAr[yx(y, x, srcW)].visible;
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
        const clickedAr = srcAr.map((cell: CellInfo) => {
            return { ...cell, visible: bool() };
        });
        const newAr = recreateData(clickedAr, srcW, srcH, newW, newH);

        for (let y = 0; y < newH; y++) {
            for (let x = 0; x < newW; x++) {
                const newVisibleVal = newAr[yx(y, x, newW)].visible;
                const oldVisibleVal = clickedAr[yx(y, x, srcW)].visible;
                expect(`(${y},${x}) ${newVisibleVal}`).toBe(`(${y},${x}) ${oldVisibleVal}`);
            }
        }
    });
});
