import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { GameField } from './GameField';
import { CELL_WIDTH } from '../Cell';
import { CellInfo, CELL_DEAD, CELL_LIVE } from '../AppStateController/appReducer';

export default {
    title: 'GameField',
    decorators: [withKnobs],
};

export const Run: React.FC<{}> = () => {
    const START_WIDTH = 3;
    const START_HEIGHT = 3;
    const START_DATA: CellInfo[] = [];

    const width = number('Width, cells', START_WIDTH);
    const height = number('Height, cells', START_HEIGHT);
    const showAll = boolean('showAll', false);

    const [data, setData] = React.useState(START_DATA);
    const [widthPixels, setWidthPixels] = React.useState(START_WIDTH * CELL_WIDTH);

    React.useEffect(() => {
        const cellsNumber = width * height;
        const startCellState = showAll ? CELL_LIVE : CELL_DEAD;
        const newData: CellInfo[] = [];
        for (let i = 0; i < cellsNumber; i++) {
            newData.push({ id: String(i), visible: startCellState });
        }
        setData(newData);
        setWidthPixels(width * CELL_WIDTH);
    }, [width, height, showAll]);

    const onCellClick = (num: number) => {
        if (num < 0 || num >= data.length) {
            return;
        }

        const newData = data.concat();
        newData[num].visible = !newData[num].visible;
        setData(newData);
    };

    return (
        <GameField
            showAll={showAll}
            data={data}
            onCellClick={onCellClick}
            widthPixels={widthPixels}
        />
    );
};
