export enum ActionType {
    HOVEDSIDE,
    UTKAST,
    FORHANDSVISNING
}

interface State {
    view: ActionType;
}

interface Action {
    view: ActionType;
}

export const initialViewState = {
    view: ActionType.HOVEDSIDE,
};

export const viewReducer = (state: State, action: Action) => {
    return {view: action.view};
};