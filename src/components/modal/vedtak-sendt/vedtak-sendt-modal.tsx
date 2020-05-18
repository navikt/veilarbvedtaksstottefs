import React from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../stores/modal-store';
import './vedtak-sendt-modal.less';

export function VedtakSendtModal(props: ModalProps) {
    const { hideModal } = useModalStore();

    return (
            <VarselModal
                isOpen={props.isOpen}
                contentLabel="Vedtaket sendt til bruker"
                onRequestClose={hideModal}
                varselIkonType={VarselIkonType.VEDTAK_SENDT}
                portalClassName="vedtak-sendt-modal"
            >
                <Systemtittel className="vedtak-sendt-modal__tekst">Oppfølgingsvedtaket er sendt til bruker</Systemtittel>
                <Hovedknapp mini={true} htmlType="button" onClick={hideModal}>OK</Hovedknapp>
            </VarselModal>
        );
}
