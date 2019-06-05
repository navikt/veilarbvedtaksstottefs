import { OrNothing } from '../../utils/types/ornothing';

export enum ModalActionType {
    MODAL_VEDTAK_SENT_SUKSESS = 'MODAL_VEDTAK_SENT_SUKSESS',
    MODAL_VEDTAK_LAGRET_SUKSESS = 'MODAL_VEDTAK_LAGRET_SUKSESS',
    MODAL_LASTER_DATA = 'MODAL_LASTER_DATA',
    MODAL_KVALITETSSIKRING = 'MODAL_KVALITETSSIKRING',
}

interface State<T> {
    modalView: OrNothing<ModalActionType>;
    props?: T;
}

interface Action<T> {
    modalView: OrNothing<ModalActionType>;
    props?: T;
}

export const initialModalViewState = {
    modalView:  null,
    props: undefined,
};

export function modalViewReducer<T> (state: State<T>, action: Action<T>) {
    return {
        modalView: action.modalView,
        props: action.props
    };
}