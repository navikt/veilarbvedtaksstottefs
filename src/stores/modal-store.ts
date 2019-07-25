import React, { useState } from 'react';
import createUseContext from 'constate';
import { ViewType } from './view-store';

export enum ModalType {
    INGEN = 'INGEN',
    VEDTAK_SENT_SUKSESS = 'VEDTAK_SENT_SUKSESS',
    VEDTAK_LAGRET_SUKSESS = 'VEDTAK_LAGRET_SUKSESS',
    LASTER_DATA = 'LASTER_DATA',
    KVALITETSSIKRING = 'KVALITETSSIKRING',
    BEKREFT_SLETT_UTKAST = 'BEKREFT_SLETT_UTKAST',
    FEIL_VED_SENDING = 'FEIL_VED_SENDING',
    FEIL_INNSENDING_STOPPET = 'FEIL_INNSENDING_STOPPET',
    FEIL_VED_FORHANDSVISNING = 'FEIL_VED_FORHANDSVISNING',
    FEIL_VED_VISNING = 'FEIL_VED_VISNING',
    FEIL_VED_LAGRING = 'FEIL_VED_LAGRING'
}

export const useModalStore = createUseContext(() => {
    const [modalType, setModalType] = useState<ModalType>(ModalType.INGEN);
    const [modalProps, setModalProps] = useState<any>({});

    const showModal = (modal: ModalType, modalProps?: {}) => {
        setModalProps(modalProps ? modalProps : {});
        setModalType(modal);
    };

    const hideModal = () => {
        setModalType(ModalType.INGEN);
    };

    return { modalType, modalProps, showModal, hideModal };
});
