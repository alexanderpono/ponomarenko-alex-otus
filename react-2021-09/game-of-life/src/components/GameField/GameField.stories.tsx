import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { GameField } from './GameField';
import { AppActions } from '@src/store/ducks/game';
import { CellInfo } from '@src/types';
import { getInverted } from '@src/store/ducks/game/playFieldUtils';

export default {
    title: 'GameField',
    decorators: [withKnobs],
};

export const Dynamic: React.FC<{}> = () => {
    const START_WIDTH = 3;
    const START_HEIGHT = 3;
    const START_DATA: CellInfo[] = [];

    const width = number('Width, cells', START_WIDTH);
    const height = number('Height, cells', START_HEIGHT);
    const showAll = boolean('showAll', false);

    const [data, setData] = React.useState(START_DATA);

    React.useEffect(() => {
        const cellsNumber = width * height;
        const startCellState = showAll ? CellInfo.alive : CellInfo.dead;
        const newData: CellInfo[] = [];
        for (let i = 0; i < cellsNumber; i++) {
            newData.push(startCellState);
        }
        setData(newData);
    }, [width, height, showAll]);

    const onCellClick = (num: number) => {
        if (num < 0 || num >= data.length) {
            return;
        }

        const newData = data.concat();
        newData[num] = getInverted(newData[num]);
        setData(newData);
    };

    return (
        <GameField
            data={data}
            onCellClick={onCellClick}
            width={width}
            actionId={AppActions.INVERT}
        />
    );
};
