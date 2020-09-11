import React, { useState } from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { useViewStore } from '../../../stores/view-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { useDataStore } from '../../../stores/data-store';
import { fetchAvbruttBeslutterProsess } from '../../../rest/api';
import { SystemMeldingType } from '../../../utils/types/melding-type';
import { hentBeslutterProsessStatus, hentId } from '../../../utils';
import { BeslutterProsessStatus } from '../../../rest/data/vedtak';

function AvbrytBeslutterProsessModal(props: ModalProps) {
    const { hideModal, showModal } = useModalStore();
    const { utkast, setUtkast, leggTilSystemMelding, setBeslutterProsessStatus } = useDataStore();
    const { changeView } = useViewStore();
    const { innsatsgruppe, setInnsatsgruppe, resetSkjema } = useSkjemaStore();
    const [dialogModalApen, setDialogModalApen] = useState(hentBeslutterProsessStatus(utkast) != null);
    const [ laster, setLaster ] = useState(false);

    function handleOnJaClicked() {
        setLaster(true);
        fetchAvbruttBeslutterProsess(hentId(utkast))
            .then(() => {
                hideModal();
                setDialogModalApen(true);
                setBeslutterProsessStatus(BeslutterProsessStatus.BESLUTTER_PROSESS_AVBRUTT);
                leggTilSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);
            })
            .catch(() => showModal(ModalType.FEIL_VED_AVBRUTT_BESLUTTER_PROSESS))
            .finally(() => setLaster(false));
    }

    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Avbryt Beslutter Prosessen"
            onRequestClose={hideModal}
            varselIkonType={VarselIkonType.ADVARSEL}
        >
            <Systemtittel className="blokk-xxxs">Endre innsatsgruppe</Systemtittel>
            <Normaltekst>Beslutterprossessen vil avbrytes. Er du sikker på at du vil endre innsatsgruppe?</Normaltekst>
            <div className="varsel-modal__knapper">
                <Hovedknapp onClick={handleOnJaClicked}>Ja</Hovedknapp>
                <Knapp onClick={hideModal}>Nei</Knapp>
            </div>
        </VarselModal>
    );
}

export default AvbrytBeslutterProsessModal;
