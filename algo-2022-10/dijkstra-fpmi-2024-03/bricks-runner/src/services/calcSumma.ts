import { LevelStats, defaultLevelStats } from '@src/bricksEditor/BricksEditorController.types';

export const calcSumma = (levelStats: LevelStats[]) => {
    const currentSumma: LevelStats = { ...defaultLevelStats };
    levelStats.forEach((level) => {
        currentSumma.coins += level.coins;
        currentSumma.steps += level.steps;
        currentSumma.time += level.time;
    });
    return currentSumma;
};
