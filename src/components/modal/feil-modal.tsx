import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import './modal.less';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';

interface FeilModalProps {
    contentLabel: string;
    isOpen: boolean;
    onRequestClose: () => void;
    tittel: string;
    innehold: string;
}

export function FeilModal({tittel, innehold, contentLabel, isOpen, onRequestClose}: FeilModalProps) {
    return (
        <ModalWrapper
            isOpen={isOpen}
            contentLabel={contentLabel}
            portalClassName="veilarbvedtaksstottefs-modal"
            onRequestClose={onRequestClose}
        >
            <FeilSirkelIkon/>
            <div className="modal__innehold">
                <Sidetittel tag="h3">{tittel}</Sidetittel>
                <Normaltekst>{innehold}</Normaltekst>
            </div>
        </ModalWrapper>
    );
}