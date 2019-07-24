import React from 'react';
import { VarselModal } from './varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Knapp } from 'nav-frontend-knapper';
import { ModalProps } from './modal-props';
import { useModalStore } from '../../stores/modal-store';
import { useViewStore } from '../../stores/view-store';
import Show from '../show';
import { FeilmodalConfig } from './feilmodal-tekster';

interface FeilmodalProps extends ModalProps {
    config: FeilmodalConfig;
}

export function FeilModal(props: FeilmodalProps) {
    const { isOpen, config: {tittel, beskrivelse, viewAction, knappeTekst} } = props;
    const { hideModal } = useModalStore();
    const { changeView } = useViewStore();

    function handleOnClick() {
        // if (typeof viewAction === 'object') {
        //     changeView(viewAction.view, viewAction.props);
        // } else {
        //     changeView(viewAction);
        // }

        changeView(viewAction);
        hideModal();
    }

    return (
        <VarselModal
            isOpen={isOpen}
            contentLabel="En feil har oppstått"
            onRequestClose={hideModal}
            type="FEIL"
            shouldCloseOnOverlayClick={false}
        >
            <Systemtittel>{tittel}</Systemtittel>
            <Normaltekst>{beskrivelse}</Normaltekst>
            <Show if={knappeTekst}>
                <Knapp onClick={handleOnClick}>
                    {knappeTekst}
                </Knapp>
            </Show>
        </VarselModal>
    );
}
