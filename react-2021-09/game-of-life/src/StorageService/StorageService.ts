import { AppState } from '@src/store/ducks/game';

export class StorageService {
    setState(state: AppState) {
        localStorage.setItem('state', JSON.stringify(state));
    }

    getState = (): AppState | null => {
        if (localStorage.getItem('state')) {
            try {
                const state = JSON.parse(localStorage.getItem('state') as string);
                return state;
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    loadState = (): Promise<AppState> => {
        return new Promise((resolve, reject) => {
            const st = this.getState();
            if (st !== null) {
                resolve(st);
            } else {
                reject(st);
            }
        });
    };

    saveState = (state: AppState): Promise<void> => {
        return new Promise((resolve) => {
            localStorage.setItem('state', JSON.stringify(state));
            resolve();
        });
    };
}
