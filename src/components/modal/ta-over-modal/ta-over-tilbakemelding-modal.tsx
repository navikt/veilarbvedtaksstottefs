import { ModalProps } from '../modal-props';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import React from 'react';
import { useModalStore } from '../../../stores/modal-store';
import { Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

function TaOverTilbakemeldingModal(props: ModalProps) {

    const { hideModal, modalProps } = useModalStore();

    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="ta over tilbakemelding"
            onRequestClose={hideModal}
            varselIkonType={VarselIkonType.ADVARSEL}
        >
            <Normaltekst className="varsel-modal__tekstinnehold">Du har nå tatt over som {modalProps.taOverFor}</Normaltekst>
            <Hovedknapp
                mini={true}
                htmlType="submit"
                onClick={hideModal}
                className="varsel-modal__knapper"
            >
                OK, GÅ TILBAKE
            </Hovedknapp>
        </VarselModal>
    );
}

export default TaOverTilbakemeldingModal;