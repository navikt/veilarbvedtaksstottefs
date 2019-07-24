import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import React, { useContext, useEffect, useRef } from 'react';
import { ModalViewDispatch } from '../../stores/modal-provider';
import { ModalActionType } from '../../stores/modal-reducer';

export function SuksessModalLagretUtkast () {
    const {modalViewState, modalViewDispatch} = useContext(ModalViewDispatch);

    const skalViseLagreModal = modalViewState.modalView === ModalActionType.MODAL_VEDTAK_LAGRET_SUKSESS;
    const timer = useRef<number | undefined>();

    useEffect(() => {
        if (skalViseLagreModal) {
            if (!timer.current) {
                timer.current = window.setTimeout(() => modalViewDispatch({modalView: null}), 5000);
            }
            return () => {
                clearTimeout(timer.current);
                timer.current = undefined;
            };
        }
    }, [modalViewState.modalView]);

    return (
        <VarselModal
            isOpen={skalViseLagreModal}
            contentLabel="Vedtaket sendt til bruker"
            onRequestClose={() => modalViewDispatch({modalView: null})}
            type="SUKSESS"
        >
            <Systemtittel>Du har lagret utkastet</Systemtittel>
            <Normaltekst>Du kan når som helst fortsette med vedtaket og det blir automatiskt lagret underveis.</Normaltekst>
        </VarselModal>
    );
}
