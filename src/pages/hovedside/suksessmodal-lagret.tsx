import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import React, { useContext } from 'react';
import { ModalViewDispatch } from '../../components/providers/modal-provider';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';

export function SuksessModalLagretUtkast () {
    const {modalViewState, modalViewDispatch} = useContext(ModalViewDispatch);

    const skalViseLagreModal = modalViewState.modalView === ModalActionType.MODAL_VEDTAK_LAGRET_SUKSESS;

    return (
        <VarselModal
            isOpen={skalViseLagreModal}
            contentLabel="Vedtaket sendt til bruker"
            onRequestClose={() => modalViewDispatch({modalView: null})}
            type="SUKSESS"
            closeButton={false}
        >
            <Systemtittel>Du har lagret utkastet</Systemtittel>
            <Normaltekst>Du kan når som helst fortsette med vedtaket og det blir automatiskt lagret underveis.</Normaltekst>
        </VarselModal>
    );
}