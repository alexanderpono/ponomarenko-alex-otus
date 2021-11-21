import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { GameField } from './GameField';
import { AppActions } from '@src/components/AppStateManager/appReducer';
import { CellInfo } from '@src/components/AppStateManager/playField.types';
import { CELL_DEAD, CELL_LIVE } from '@src/components/AppStateManager/playField.consts';

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
        const startCellState = showAll ? CELL_LIVE : CELL_DEAD;
        const newData: CellInfo[] = [];
        for (let i = 0; i < cellsNumber; i++) {
            newData.push({ id: String(i), visible: startCellState });
        }
        setData(newData);
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
            width={width}
            actionId={AppActions.INVERT}
        />
    );
};
