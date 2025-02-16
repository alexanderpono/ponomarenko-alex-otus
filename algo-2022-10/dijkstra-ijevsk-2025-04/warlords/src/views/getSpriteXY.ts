import { Cell, LevelMap } from '@src/game/LevelMap';
import { getArea, leaveR, multArea } from './Matrix3x3';

export const getSpriteXY = (levelMap: LevelMap, x: number, y: number, cell: Cell) => {
    const sprites = {
        water: { x: 0, y: 0 },
        grass: { x: 40, y: 0 },
        roadL: { x: 160, y: 120 },
        roadR: { x: 160, y: 160 },
        roadU: { x: 120, y: 160 },
        roadD: { x: 120, y: 120 },
        roadV: { x: 80, y: 120 },
        roadH: { x: 80, y: 160 },
        roadLD: { x: 0, y: 160 },
        roadLU: { x: 0, y: 120 },
        roadRU: { x: 40, y: 120 },
        roadRD: { x: 40, y: 160 }
    };
    const getRoadCell = (key: string) => {
        switch (key) {
            case '***rr****':
                return sprites.roadL;
            case '***rrr***':
                return sprites.roadH;
            case '*r**rr***':
                return sprites.roadLD;
            case '****rr***':
                return sprites.roadR;
            case '*r**r**r*':
                return sprites.roadV;
            case '***rr**r*':
                return sprites.roadRU;
            case '****r**r*':
                return sprites.roadD;
            default:
                console.log('road key=', key);
                return sprites.water;
        }
    };
    switch (cell) {
        case Cell.grass:
            return { x: 40, y: 0 };
        case Cell.town:
            return { x: 160, y: 280 };
        case Cell.road:
            const area1 = getArea(levelMap, x, y);
            const area2 = multArea(area1, ['*1*'.split(''), '111'.split(''), '*1*'.split('')]);
            const area3 = leaveR(area2);
            const key = area3[0].join('') + area3[1].join('') + area3[2].join('');
            return getRoadCell(key);
        default:
            return { x: 0, y: 0 };
    }
};
