import { ModalProps } from './modal-props';
import { VarselIkonType, VarselModal } from './varsel-modal/varsel-modal';
import React from 'react';
import { ModalType, useModalStore } from '../../stores/modal-store';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { finnUtkast } from '../../utils';
import { useFetchStore } from '../../stores/fetch-store';
import { fetchWithInfo } from '../../rest/utils';
import { lagTaOverUtkastFetchInfo } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';

function TaOverUtkastModal(props: ModalProps) {

    const { fnr } = useAppStore();
    const { hideModal, showModal } = useModalStore();
    const { vedtak } = useFetchStore();


    const utkast = finnUtkast(vedtak.data);

    const veilederNavn = utkast ? utkast.veilederNavn : undefined;

    function handleTaOver() {
        showModal(ModalType.LASTER);
        fetchWithInfo(lagTaOverUtkastFetchInfo({ fnr }))
            .then(() => {
                vedtak.fetch({ fnr }, state => {
                    hideModal();
                });
            })
            .catch(() => {
                showModal(ModalType.FEIL_VED_OVERTAKELSE);
            });
    }

    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Bekreft slett utkast"
            onRequestClose={hideModal}
            varselIkonType={VarselIkonType.ADVARSEL}
        >
            <Normaltekst>{`Vil du ta over som ansvarlig for vedtaket fra ${veilederNavn}?`}</Normaltekst>
            <div className="varsel-modal__knapper">
                <Hovedknapp onClick={handleTaOver}>Ta over</Hovedknapp>
                <Knapp onClick={hideModal}> Avbryt</Knapp>
            </div>
        </VarselModal>
    )
}

export default TaOverUtkastModal;
