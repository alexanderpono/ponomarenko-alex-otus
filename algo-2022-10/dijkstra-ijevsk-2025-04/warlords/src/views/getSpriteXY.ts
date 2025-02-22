import { Cell, LevelMap } from '@src/game/LevelMap';
import { getArea, filterChar, multArea } from './Matrix3x3';

const sprites = {
    water: { x: 0, y: 0 },
    grass: { x: 40, y: 0 },
    largeBuilding: { x: 160, y: 0 },

    roadL: { x: 160, y: 120 },
    roadR: { x: 160, y: 160 },
    roadU: { x: 120, y: 160 },
    roadD: { x: 120, y: 120 },
    roadV: { x: 80, y: 120 },
    roadH: { x: 80, y: 160 },
    roadLD: { x: 0, y: 160 },
    roadLU: { x: 0, y: 120 },
    roadRU: { x: 40, y: 120 },
    roadRD: { x: 40, y: 160 },

    townLU: { x: 160, y: 280 },
    townRU: { x: 200, y: 280 },
    townLD: { x: 160, y: 320 },
    townRD: { x: 200, y: 320 },

    waterLD: { x: 0, y: 80 },
    waterLU: { x: 0, y: 40 },
    waterRU: { x: 40, y: 40 },
    waterRD: { x: 40, y: 80 },
    waterD: { x: 160, y: 40 },
    waterU: { x: 160, y: 80 },
    waterR: { x: 200, y: 40 },
    waterL: { x: 200, y: 80 },

    hillLD: { x: 0, y: 320 },
    hillLU: { x: 0, y: 280 },
    hillRU: { x: 40, y: 280 },
    hillRD: { x: 40, y: 320 },
    hill: { x: 80, y: 280 },

    hero: { x: 280, y: 280 },
    giant: { x: 280, y: 280 }
};

const getKey = (levelMap: LevelMap, x: number, y: number, char: string): string => {
    const area1 = getArea(levelMap, x, y);
    const area2 = multArea(area1, ['*1*'.split(''), '111'.split(''), '*1*'.split('')]);
    const area3 = filterChar(area2, char);
    const key = area3[0].join('') + area3[1].join('') + area3[2].join('');
    return key;
};

const getRoadCell = (levelMap: LevelMap, x: number, y: number) => {
    const key = getKey(levelMap, x, y, 'r');
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
        case '*r**r****':
            return sprites.roadU;
        default:
            console.log('road key=', key);
            return sprites.water;
    }
};

const getTownCell = (levelMap: LevelMap, x: number, y: number) => {
    const key = getKey(levelMap, x, y, 'T');
    switch (key) {
        case '****TT*T*':
            return sprites.townLU;
        case '***TT**T*':
            return sprites.townRU;
        case '*T**TT***':
            return sprites.townLD;
        case '*T*TT****':
            return sprites.townRD;
        default:
            console.log('road key=', key);
            return sprites.water;
    }
};

const getWaterCell = (levelMap: LevelMap, x: number, y: number) => {
    const key = getKey(levelMap, x, y, 'w');
    switch (key) {
        case '****ww*w*':
            return sprites.waterLU;
        case '***ww**w*':
            return sprites.waterRU;
        case '*w**ww***':
            return sprites.waterLD;
        case '*w*ww****':
            return sprites.waterRD;
        default:
            console.log('water key=', key);
            return sprites.water;
    }
};

const getHillCell = (levelMap: LevelMap, x: number, y: number) => {
    const key = getKey(levelMap, x, y, 'h');
    switch (key) {
        case '****h**h*':
        case '****hh*h*':
            return sprites.hillLU;
        case '***hh**h*':
        case '***hh****':
        case '*h*hh**h*':
            return sprites.hillRU;

        case '****hh***':
        case '*h**hh*h*':
        case '*h**hh***':
            return sprites.hillLD;
        case '*h*hh****':
            return sprites.hillRD;

        case '***hhh***':
        case '*h*hhh*h*':
        case '*h*hhh***':
            return sprites.hill;
        default:
            console.log('hill key=', key);
            return sprites.water;
    }
};

export const getSpriteXY = (levelMap: LevelMap, x: number, y: number, cell: Cell) => {
    switch (cell) {
        case Cell.grass:
            return sprites.grass;
        case Cell.town:
            return getTownCell(levelMap, x, y);
        case Cell.road:
            return getRoadCell(levelMap, x, y);
        case Cell.water:
            return getWaterCell(levelMap, x, y);
        case Cell.hill:
            return getHillCell(levelMap, x, y);
        case Cell.largeBuilding:
            return sprites.largeBuilding;
        default:
            return { x: 0, y: 0 };
    }
};

export const getUnitSpriteXY = (cell: Cell) => {
    switch (cell) {
        case Cell.hero:
            return sprites.hero;
        case Cell.giant:
            return sprites.giant;
        default:
            return { x: 0, y: 0 };
    }
};
