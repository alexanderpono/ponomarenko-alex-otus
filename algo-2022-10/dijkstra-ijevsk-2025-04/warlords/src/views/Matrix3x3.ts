import { LevelMap } from '@src/game/LevelMap';

export const getArea = (levelMap: LevelMap, x: number, y: number): string[][] => {
    const w = levelMap.getWidth();
    const h = levelMap.getHeight();
    const line1 = '---'.split('');
    const line2 = '---'.split('');
    const line3 = '---'.split('');
    const center = levelMap.field[y][x];
    line2[1] = center;
    if (y > 0) {
        const u = levelMap.field[y - 1][x];
        line1[1] = u;

        if (x > 0) {
            const lu = levelMap.field[y - 1][x - 1];
            line1[0] = lu;
        }

        if (x < w - 1) {
            const ru = levelMap.field[y - 1][x + 1];
            line1[2] = ru;
        }
    }

    if (x > 0) {
        const l = levelMap.field[y][x - 1];
        line2[0] = l;
    }
    if (x < w - 1) {
        const r = levelMap.field[y][x + 1];
        line2[2] = r;
    }

    if (y < h - 1) {
        if (x > 0) {
            const ld = levelMap.field[y + 1][x - 1];
            line3[0] = ld;
        }
        const d = levelMap.field[y + 1][x];
        line3[1] = d;

        if (x < w - 1) {
            const rd = levelMap.field[y + 1][x + 1];
            line3[2] = rd;
        }
    }
    return [line1, line2, line3];
};

export const multArea = (op1: string[][], op2: string[][]): string[][] => {
    const result = ['***'.split(''), '***'.split(''), '***'.split('')];
    result[0][0] = op2[0][0] === '1' ? op1[0][0] : '*';
    result[0][1] = op2[0][1] === '1' ? op1[0][1] : '*';
    result[0][2] = op2[0][2] === '1' ? op1[0][2] : '*';

    result[1][0] = op2[1][0] === '1' ? op1[1][0] : '*';
    result[1][1] = op2[1][1] === '1' ? op1[1][1] : '*';
    result[1][2] = op2[1][2] === '1' ? op1[1][2] : '*';

    result[2][0] = op2[2][0] === '1' ? op1[2][0] : '*';
    result[2][1] = op2[2][1] === '1' ? op1[2][1] : '*';
    result[2][2] = op2[2][2] === '1' ? op1[2][2] : '*';

    return result;
};

export const leaveR = (op1: string[][]): string[][] => {
    const result = ['***'.split(''), '***'.split(''), '***'.split('')];
    result[0][0] = op1[0][0] === 'r' ? 'r' : '*';
    result[0][1] = op1[0][1] === 'r' ? 'r' : '*';
    result[0][2] = op1[0][2] === 'r' ? 'r' : '*';

    result[1][0] = op1[1][0] === 'r' ? 'r' : '*';
    result[1][1] = op1[1][1] === 'r' ? 'r' : '*';
    result[1][2] = op1[1][2] === 'r' ? 'r' : '*';

    result[2][0] = op1[2][0] === 'r' ? 'r' : '*';
    result[2][1] = op1[2][1] === 'r' ? 'r' : '*';
    result[2][2] = op1[2][2] === 'r' ? 'r' : '*';

    return result;
};
