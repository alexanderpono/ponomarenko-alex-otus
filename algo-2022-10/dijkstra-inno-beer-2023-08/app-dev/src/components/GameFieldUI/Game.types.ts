import { Point2D, defaultPoint2D } from '@src/game/GameField';
import { ManAni } from '@src/ports/GR.types';

export interface GameFieldController {
    nodesClicked: () => void;
    linesClicked: () => void;
    pathClicked: () => void;
    nodesCostClicked: () => void;
    mapClicked: () => void;
    onBtStartClick: () => void;
    onBtClearClick: () => void;
}
export interface GameState {
    nodesChecked: boolean;
    linesChecked: boolean;
    pathChecked: boolean;
    nodesCostChecked: boolean;
    mapChecked: boolean;
    showControls: boolean;
    pic: InstanceType<typeof Image>;
    goldScreenXY: Point2D;
    manScreenXY: Point2D;
    manAni: ManAni;
    miniCounter: number;
}
export const defaultGameState: GameState = {
    nodesChecked: false,
    linesChecked: false,
    pathChecked: false,
    nodesCostChecked: false,
    mapChecked: false,
    showControls: false,
    pic: null,
    goldScreenXY: { ...defaultPoint2D },
    manScreenXY: { ...defaultPoint2D },
    manAni: ManAni.STAND,
    miniCounter: 0
};
