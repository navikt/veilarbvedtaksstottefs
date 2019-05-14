export enum ActionType {
    HOVEDSIDE = 'HOVEDSIDE',
    UTKAST = 'UTKAST',
    INNSENDING = 'INNSENDING',
    GJELDENE_VEDTAK = 'GJELDENE_VEDTAK'
}

interface State<T> {
    view: ActionType;
    props?: T;
}

interface Action<T> {
    view: ActionType;
    props?: T;
}

export const initialViewState = {
    view: ActionType.HOVEDSIDE,
    props: undefined,
};

export function viewReducer<T> (state: State<T>, action: Action<T>) {
    return {
        view: action.view,
        props: action.props
    };
}