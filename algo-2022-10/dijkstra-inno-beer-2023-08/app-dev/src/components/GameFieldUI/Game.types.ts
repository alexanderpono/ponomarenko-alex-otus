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
    picLoaded: boolean;
    showControls: boolean;
    pic: InstanceType<typeof Image>;
}
export const defaultGameState: GameState = {
    nodesChecked: false,
    linesChecked: false,
    pathChecked: false,
    nodesCostChecked: false,
    mapChecked: false,
    picLoaded: false,
    showControls: false,
    pic: null
};
