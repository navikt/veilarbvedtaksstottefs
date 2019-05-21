export enum ActionType {
    HOVEDSIDE = 'HOVEDSIDE',
    UTKAST = 'UTKAST',
    INNSENDING = 'INNSENDING',
    VIS_VEDLEGG = 'VIS_VEDLEGG',
    VIS_VEDTAK = 'VIS_VEDTAK',
    VIS_VEDTAK_PDF = 'VIS_VEDTAK_PDF'
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
