import saveas from 'file-saver';
import axios from 'axios';
import { LevelsApiAnswer } from '@src/bricksEditor/BricksEditorController.types';

const map2 = `
▓ M              ▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓▓          ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓▓          ▓
▓  ╡     ╡    ╡  ▓▓          ▓
▓  ╡     ╡    ╡  ▓▓          ▓
▓  ╡     ╡    ╡  ▓▓          ▓
▓  ╡     ╡   $╡  ▓▓          ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

export class MapStorageService {
    readMap = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                resolve(contents.toString().trim());
            };
            reader.readAsText(file);
        });
    };

    saveMap = (map: string) => {
        var blob = new Blob([map], { type: 'text/plain;charset=utf-8' });

        saveas(blob, 'save.txt');
    };

    getDefaultMap = () => map2;

    getMapFromCache = () => '';

    getMapFromHttpFile = (url: string): Promise<string> => {
        return Promise.resolve(
            `▓                ▓
▓      c         ▓
▓    ▓▓▓▓▓       ▓
▓      ▓         ▓
▓      ▓         ▓
▓      ▓         ▓
▓  M   ▓       $ ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`
        );
    };

    loadLevels = (): Promise<LevelsApiAnswer> => {
        return Promise.resolve({
            levels: [
                {
                    mapFile: '01.txt',
                    inventory: [
                        {
                            name: 'stairs',
                            count: 5,
                            char: '╡'
                        }
                    ],
                    introText:
                        'Добавьте лестницу, чтобы персонаж преодолел препятствие и добрался [br]до сундука'
                },
                {
                    mapFile: '02.txt',
                    inventory: [
                        {
                            name: 'brick',
                            count: 1,
                            char: '▓'
                        }
                    ],
                    introText: 'Добавьте один блок кирпичей, чтобы добраться до 3-х монет'
                },
                {
                    mapFile: '03.txt',
                    inventory: [
                        {
                            name: 'space',
                            count: 1,
                            char: ' '
                        }
                    ],
                    introText:
                        'Добавьте пустоту вместо блока кирпичей, чтобы собрать на 3 монеты больше'
                },
                {
                    mapFile: '04.txt',
                    inventory: [
                        {
                            name: 'stairs',
                            count: 7,
                            char: '╡'
                        },
                        {
                            name: 'brick',
                            count: 4,
                            char: '▓'
                        }
                    ],
                    introText:
                        'Добавьте лестницы так, чтобы добраться до каждой монеты. [br]Не забудьте заблокировать проходы между кирпичными блоками, [br]чтобы персонаж не пропустил лестницы. [br][br] * Кирпичных блоков в инвентаре достаточно, чтобы собрать все монеты!'
                }
            ]
        });
    };
}
