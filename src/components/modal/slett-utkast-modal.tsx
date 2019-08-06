import React from 'react';
import { VarselModal } from './varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from './modal-props';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { fetchWithInfo } from '../../rest/utils';
import { lagSlettUtkastFetchInfo } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import { useFetchStore } from '../../stores/fetch-store';
import { useSkjemaStore } from '../../stores/skjema-store';

function SlettUtkastModal (props: ModalProps) {
    const { fnr } = useAppStore();
    const { hideModal, showModal } = useModalStore();
    const { vedtak } = useFetchStore();
    const { changeView } = useViewStore();
    const { resetSkjema } = useSkjemaStore();

    function handleOnDeleteClicked() {
        showModal(ModalType.LASTER);
        fetchWithInfo(lagSlettUtkastFetchInfo({fnr}))
            .then(() => {
                vedtak.fetch({ fnr }, () => {
                    resetSkjema();
                    hideModal();
                    changeView(ViewType.HOVEDSIDE);
                });
            })
            .catch(() => {
                showModal(ModalType.FEIL_VED_SLETTING);
            });
    }

    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Bekreft slett utkast"
            onRequestClose={hideModal}
            type="ADVARSEL"
        >
            <Systemtittel className="blokk-xxxs">Slett utkast</Systemtittel>
            <Normaltekst>Er du sikker på at du vil slette utkastet?</Normaltekst>
            <div className="varsel-modal__knapper">
                <Hovedknapp onClick={handleOnDeleteClicked}>Slett</Hovedknapp>
                <Knapp onClick={hideModal}> Avbryt</Knapp>
            </div>
        </VarselModal>
    );
}

export default SlettUtkastModal;
