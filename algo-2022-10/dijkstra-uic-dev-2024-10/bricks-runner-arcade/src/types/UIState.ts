export interface UIState {
    showNodes: boolean;
    showLines: boolean;
    showPath: boolean;
    showNodesCost: boolean;
    showMap: boolean;
}

export const defaultUIState: UIState = {
    showNodes: false,
    showLines: false,
    showPath: false,
    showNodesCost: false,
    showMap: false
};
