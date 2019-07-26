import React, { useEffect, useRef } from 'react';
import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { ModalProps } from '../../components/modal/modal-props';
import { useModalStore } from '../../stores/modal-store';

export function SuksessModalLagretUtkast (props: ModalProps) {
    const { hideModal } = useModalStore();
    const timer = useRef<number | undefined>();

    useEffect(() => {
        if (props.isOpen) {
            if (!timer.current) {
                timer.current = window.setTimeout(hideModal, 5000);
            }
            return () => {
                clearTimeout(timer.current);
                timer.current = undefined;
            };
        }
    }, [props.isOpen]);

    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Vedtaket sendt til bruker"
            onRequestClose={hideModal}
            type="SUKSESS"
        >
            <Systemtittel>Du har lagret utkastet</Systemtittel>
            <Normaltekst>Du kan når som helst fortsette med vedtaket og det blir automatiskt lagret underveis.</Normaltekst>
        </VarselModal>
    );
}
