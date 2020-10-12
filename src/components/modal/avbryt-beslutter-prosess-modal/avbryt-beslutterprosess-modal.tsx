import React from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { useDataStore } from '../../../stores/data-store';
import { fetchAvbrytBeslutterProsess } from '../../../rest/api';
import { SystemMeldingType } from '../../../utils/types/melding-type';
import { hentId } from '../../../utils';
import { InnsatsgruppeType } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';

interface AvbrytBeslutterProsessModalProps extends ModalProps{
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function AvbrytBeslutterProsessModal(props: AvbrytBeslutterProsessModalProps) {
    const { hideModal, showModal } = useModalStore();
    const { utkast, leggTilSystemMelding, nullStillBeslutterProsess } = useDataStore();
    const { setInnsatsgruppe } = useSkjemaStore();

    function handleOnJaClicked() {
        fetchAvbrytBeslutterProsess(hentId(utkast))
            .then(() => {
                hideModal();
                setInnsatsgruppe(props.innsatsgruppe);
                nullStillBeslutterProsess();
                leggTilSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);
            })
            .catch(() => showModal(ModalType.FEIL_VED_AVBRYT_BESLUTTER_PROSESS));
    }

    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Avbryt Beslutter Prosessen"
            onRequestClose={hideModal}
            varselIkonType={VarselIkonType.ADVARSEL}
        >
            <Systemtittel className="blokk-xxxs">Endre innsatsgruppe</Systemtittel>
            <Normaltekst>Beslutterprosessen vil avbrytes. Er du sikker på at du vil endre innsatsgruppe?</Normaltekst>
            <div className="varsel-modal__knapper">
                <Hovedknapp onClick={handleOnJaClicked}>Ja</Hovedknapp>
                <Knapp onClick={hideModal}>Nei</Knapp>
            </div>
        </VarselModal>
    );
}

export default AvbrytBeslutterProsessModal;
