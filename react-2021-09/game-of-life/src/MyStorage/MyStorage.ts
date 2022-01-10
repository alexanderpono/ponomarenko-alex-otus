import { AppState } from '@src/store/ducks/game';

export class MyStorage {
    setState(state: AppState) {
        localStorage.setItem('state', JSON.stringify(state));
    }

    getState(): AppState | null {
        if (localStorage.getItem('state')) {
            try {
                const state = JSON.parse(localStorage.getItem('state') as string);
                return state;
            } catch (e) {
                return null;
            }
        }
        return null;
    }
}
