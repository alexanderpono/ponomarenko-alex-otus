import saveas from 'file-saver';
import axios from 'axios';
import { LevelsApiAnswer } from '@src/bricksEditor/BricksEditorController.types';

const map2 = `
▓ M              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓▓                ▓
▓       ╡        ▓▓                ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓                ▓
▓           ╡    ▓▓                ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓▓                ▓
▓  ╡     ╡    ╡  ▓▓                ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓▓                ▓
▓       ╡        ▓▓                ▓
▓▓▓▓▓▓▓▓ ▓▓▓▓▓▓▓▓▓▓                ▓
▓                ▓▓                ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓                ▓
▓           ╡    ▓▓                ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓▓                ▓
▓  ╡     ╡    ╡  ▓▓                ▓
▓  ╡     ╡    ╡  ▓▓                ▓
▓  ╡     ╡    ╡  ▓▓                ▓
▓  ╡     ╡   $╡  ▓▓                ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
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
        return axios({
            method: 'get',
            url: url,
            responseType: 'stream'
        })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.log('getMapFromHttpFile() err=', err);
                return '';
            });
    };

    loadLevels = (): Promise<LevelsApiAnswer> => {
        return axios({
            method: 'get',
            url: './data/levels.json',
            responseType: 'stream'
        })
            .then(function (response) {
                const levels = JSON.parse(response.data);
                return levels;
            })
            .catch((err) => {
                console.log('loadGame() err=', err);
            });
    };
}
