import React from 'react';
import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../../components/modal/modal-props';
import { useModalStore } from '../../stores/modal-store';

export function SuksessModalInnsending (props: ModalProps) {
    const { hideModal } = useModalStore();
    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Vedtaket sendt til bruker"
            onRequestClose={hideModal}
            type="SUKSESS"
        >
            <Systemtittel>Vedtak sendt til bruker</Systemtittel>
            <Normaltekst>Du finner innholdet i vedtaket på fanen for oppfølgingsvedtak. Brukeren får vedtaksbrevet digitalt eller i posten</Normaltekst>
            <Knapp onClick={hideModal}>Lukk</Knapp>
        </VarselModal>
    );
}
