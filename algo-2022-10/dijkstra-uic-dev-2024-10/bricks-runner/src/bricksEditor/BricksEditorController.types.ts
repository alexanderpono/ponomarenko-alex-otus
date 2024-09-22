import { GameFieldController } from '@src/components/GameFieldUI/Game.types';
import { Cell, Point2D } from '@src/game/GameField';

export interface BricksEditorControllerForUI extends GameFieldController {
    handleClickBtBrick?: () => void;
    handleClickBtStairs?: () => void;
    handleClickBtGold?: () => void;
    handleClickBtSpace?: () => void;
    onUploadFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickBtSaveAs?: () => void;
}

export interface ShellState {
    isDevelopMope: boolean;
    curPathPos: number;
    inventory: InventoryItem[];
    levelIndex: number;
    curChar: string;
    levelStats: LevelStats[];
    coinsTaken: number;
    levelTime: number;
    render: number;
    levels: LevelInfo[];
    pathIsFound: boolean;
}

export interface InventoryItem {
    name: string;
    count: number;
    char: string;
}

const defaultInventoryItem: InventoryItem = {
    name: '',
    count: 0,
    char: ''
};

export interface LevelInfo {
    mapFile: string;
    inventory: InventoryItem[];
    introText: string;
}

export interface LevelsApiAnswer {
    levels: LevelInfo[];
}
export const defaultLevelsApiAnswer: LevelsApiAnswer = {
    levels: []
};

export interface DynamicObject {
    point: Point2D;
    type: Cell;
}

export interface LevelStats {
    steps: number;
    coins: number;
    time: number;
}
export const defaultLevelStats: LevelStats = {
    steps: 0,
    coins: 0,
    time: 0
};

export enum GameScreen {
    default = '',
    intro = 'intro',
    level = 'level',
    finishLevel = 'finishLevel',
    gameOver = 'gameOver',
    levelIntro = 'levelIntro'
}

export enum Render {
    gameScreen = 1,
    gameOverScreen = 2,
    gameLevelControls = 4,
    developControls = 8,
    levelStats = 16,
    introScreen = 32,
    finishLevelScreen = 64,
    levelIntroScreen = 128
}
