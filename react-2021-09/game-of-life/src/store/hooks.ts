import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { AppState } from './ducks/game';

export const useAppState = () => {
    const appState = useSelector<RootState, AppState>((st: RootState) => st.game);
    return appState;
};
