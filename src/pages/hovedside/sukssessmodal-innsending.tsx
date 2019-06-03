import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import React, { useContext } from 'react';
import { ModalViewDispatch } from '../../components/providers/modal-provider';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';

export function SuksessModalInnsending () {
    const {modalViewState, modalViewDispatch} = useContext(ModalViewDispatch);
    return (
        <VarselModal
            isOpen={modalViewState.modalView === ModalActionType.MODAL_VEDTAK_SENT_SUKSESS}
            contentLabel="Vedtaket sendt til bruker"
            onRequestClose={() => modalViewDispatch({modalView: null})}
            type="SUKSESS"
        >
            <Systemtittel>Vedtak sendt til bruker</Systemtittel>
            <Normaltekst>Du finner innholdet i vedtaket på fanen for oppfølgingsvedtak. Brukeren får vedtaksbrevet digitalt eller i posten</Normaltekst>
        </VarselModal>
    );
}