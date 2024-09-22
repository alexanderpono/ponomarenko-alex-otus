import { formatTime } from '@src/adapters/formatTime';
import { LevelStats } from '@src/bricksEditor/BricksEditorController.types';
import saveas from 'file-saver';
import { calcSumma } from './calcSumma';

export class ResultsStorageService {
    calcStatsText = (userName: string, stats: LevelStats[]): string => {
        const currentSumma = calcSumma(stats);

        const fileText = `
Telegram:@${userName} coints-total:${currentSumma.coins} time-total:${currentSumma.time}
${stats
    .map((levelStats: LevelStats, index) => {
        return `level:${index + 1} coins:${levelStats.coins} time:${formatTime(levelStats.time)}`;
    })
    .join('\n')}
`;
        return fileText;
    };

    writeToFile = (fileText: string) => {
        var blob = new Blob([fileText], { type: 'text/plain;charset=utf-8' });

        saveas(blob, 'bricksrunnerstat.txt');
    };

    updateLocalStorage = (fileText: string) => {
        const oldText = localStorage.getItem('stats') || '';
        localStorage.setItem('stats', oldText + fileText);
    };

    saveGameResults = (userName: string, stats: LevelStats[]) => {
        const fileText = this.calcStatsText(userName, stats);
        this.updateLocalStorage(fileText);
        this.writeToFile(fileText);
    };
}
