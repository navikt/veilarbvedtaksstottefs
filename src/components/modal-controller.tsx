import React from 'react';
import { ModalType, useModalStore } from '../stores/modal-store';
import { FeilModal } from './modal/feilmodal';
import {
    FeilmodalConfig,
    feilVedForhandsvisnigConfig,
    feilVedLagringConfig,
    feilVedSendningConfig,
    feilVedVisningConfig,
    stoppeInnsendingFeatureToggleConfig
} from './modal/feilmodal-tekster';
import { SpinnerModal } from './modal/spinner-modal';
import { KvalitetsSikringModalInnsending } from '../pages/forhandsvisning/kvalitetssikring';
import { SuksessModalInnsending } from '../pages/hovedside/sukssessmodal-innsending';
import { SuksessModalLagretUtkast } from '../pages/hovedside/suksessmodal-lagret';

function finnFeilModalConfig(modalType: ModalType): FeilmodalConfig | null {
    switch (modalType) {
        case ModalType.FEIL_VED_SENDING:
            return feilVedSendningConfig;
        case ModalType.FEIL_INNSENDING_STOPPET:
            return stoppeInnsendingFeatureToggleConfig;
        case ModalType.FEIL_VED_FORHANDSVISNING:
            return feilVedForhandsvisnigConfig;
        case ModalType.FEIL_VED_VISNING:
            return feilVedVisningConfig;
        case ModalType.FEIL_VED_LAGRING:
            return feilVedLagringConfig;
        default:
            return null;
    }
}

export function ModalController() {
    const {modalType, modalProps} = useModalStore();
    const feilModalConfig = finnFeilModalConfig(modalType);

    return (
        <>
            <SpinnerModal isOpen={modalType === ModalType.LASTER_DATA}/>
            <KvalitetsSikringModalInnsending isOpen={modalType === ModalType.KVALITETSSIKRING} sendVedtak={modalProps.sendVedtak}/>
            <SuksessModalInnsending isOpen={modalType === ModalType.VEDTAK_SENT_SUKSESS}/>
            <SuksessModalLagretUtkast isOpen={modalType === ModalType.VEDTAK_LAGRET_SUKSESS}/>
            {feilModalConfig && <FeilModal isOpen={feilModalConfig != null} config={feilModalConfig}/>}
        </>
    );
}
