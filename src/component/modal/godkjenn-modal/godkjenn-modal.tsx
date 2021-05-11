import React, { useState } from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { ModalType, useModalStore } from '../../../store/modal-store';

import { godkjennVedtak } from '../../../api/veilarbvedtaksstotte/beslutter';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { BeslutterProsessStatus, Utkast } from '../../../api/veilarbvedtaksstotte';
import { useDataStore } from '../../../store/data-store';

export function GodkjennModal(props: ModalProps) {
	const { utkast, leggTilSystemMelding, setBeslutterProsessStatus } = useDataStore();
	const { hideModal, showModal } = useModalStore();
	const { id: utkastId } = utkast as Utkast;
	const [laster, setLaster] = useState(false);

	function handleGodkjennVedtak() {
		setLaster(true);
		godkjennVedtak(utkastId)
			.then(() => {
				leggTilSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);
				setBeslutterProsessStatus(BeslutterProsessStatus.GODKJENT_AV_BESLUTTER);
				hideModal();
			})
			.catch(() => showModal(ModalType.FEIL_VED_GODKJENT_AV_BESLUTTER))
			.finally(() => setLaster(false));
	}
	function handleOnRequestCloseModal() {
		if (!laster) {
			hideModal();
		}
	}
	const GodkjennVisning = (
		<>
			<Systemtittel className="blokk-xxxs">Godkjenn utkast</Systemtittel>
			<Normaltekst>
				<br />
				Er du sikker på at utkast er klart til godkjenning? <br />
				Ansvarlig veileder kan fortsatt endre utkastet.
			</Normaltekst>
			<div className="varsel-modal__knapper">
				<Hovedknapp spinner={laster} disabled={laster} onClick={handleGodkjennVedtak}>
					JA, GODKJENN
				</Hovedknapp>
				<Knapp disabled={laster} onClick={hideModal}>
					AVBRYT
				</Knapp>
			</div>
		</>
	);

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Bekreft at vedtaket blir godkjent"
			onRequestClose={handleOnRequestCloseModal}
			varselIkonType={VarselIkonType.ADVARSEL}
		>
			{GodkjennVisning}
		</VarselModal>
	);
}

export default GodkjennModal;
