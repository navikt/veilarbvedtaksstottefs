import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import './modal.less';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import { ReactComponent as OkSirkelIkon } from './ok-sirkel.svg';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';

type VarselModalType = 'SUKSESS' | 'FEIL' | 'ADVARSEL';

interface VarselModalProps {
    contentLabel: string;
    isOpen: boolean;
    onRequestClose: () => void;
    type: VarselModalType;
    closeTimeoutMS?: number;
    closeButton?: boolean;
}

export function VarselModal({contentLabel, isOpen, onRequestClose, children, type, closeTimeoutMS, closeButton}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <ModalWrapper
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            closeTimeoutMS={closeTimeoutMS}
            closeButton={closeButton}
            portalClassName="veilarbvedtaksstottefs-modal"
        >
            <VarselIkone type={type}/>
            <div className="modal__innehold">
                {children}
            </div>
        </ModalWrapper>
    );
}

function VarselIkone(props: {type: VarselModalType}) {
    switch (props.type) {
        case 'SUKSESS':
            return <OkSirkelIkon/>;
        case 'FEIL':
            return <FeilSirkelIkon/>;
        case 'ADVARSEL':
            return <AdvarselSirkelIkon/>;
        default:
            return null;
    }

}