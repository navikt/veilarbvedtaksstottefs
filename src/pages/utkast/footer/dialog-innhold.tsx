import React, { useState } from 'react';
import Show from '../../../components/show';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useDataStore } from '../../../stores/data-store';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { BeslutterProsessStatus, Vedtak } from '../../../rest/data/vedtak';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	isNothing
} from '../../../utils';
import { hentMalformFraData, SkjemaData, trengerBeslutter } from '../../../utils/skjema-utils';
import {
	fetchBliBeslutter,
	fetchGodkjennVedtak,
	fetchOppdaterBeslutterProsessStatus,
	fetchOppdaterVedtakUtkast,
	fetchStartBeslutterProsess
} from '../../../rest/api';
import { SystemMeldingType } from '../../../utils/types/melding-type';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { VeilederTilgang } from '../../../utils/tilgang';
import { UtkastStatusMelding } from './utkast-status-melding';

interface DialogFooterInnholdProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

export function DialogInnhold(props: DialogFooterInnholdProps) {
	const {
		erBeslutter,
		erAnsvarligVeileder,
		erIkkeAnsvarligVeileder,
		veilederTilgang,
		setVeilederTilgang
	} = useTilgangStore();
	const {
		malform,
		utkast,
		leggTilSystemMelding,
		innloggetVeileder,
		setUtkastBeslutter,
		setBeslutterProsessStatus
	} = useDataStore();
	const { showModal } = useModalStore();
	const { innsatsgruppe } = useSkjemaStore();
	const { id: utkastId, beslutterNavn, beslutterProsessStatus } = utkast as Vedtak;

	const [laster, setLaster] = useState(false);

	const visStartBeslutterProsess =
		trengerBeslutter(innsatsgruppe) &&
		erAnsvarligVeileder &&
		isNothing(beslutterNavn) &&
		!erBeslutterProsessStartet(beslutterProsessStatus);

	const godkjentAvBeslutter = erGodkjentAvBeslutter(beslutterProsessStatus);

	const visKlarTilBeslutter = erKlarTilVeileder(beslutterProsessStatus);

	const visBliBeslutter =
		erIkkeAnsvarligVeileder && isNothing(beslutterNavn) && erKlarTilBeslutter(beslutterProsessStatus);

	const visGodkjennUtkast = erBeslutterProsessStartet(beslutterProsessStatus) && erBeslutter && !godkjentAvBeslutter;

	const visKlarTil =
		erBeslutterProsessStartet(beslutterProsessStatus) &&
		((erAnsvarligVeileder && erKlarTilVeileder(beslutterProsessStatus)) ||
			(erBeslutter && erKlarTilBeslutter(beslutterProsessStatus)));

	function sendDataTilBackend() {
		// Vi oppdaterer ikke lagringStatus her fordi det blir rart at dette trigges på en "urelatert" handling
		const params = { vedtakId: utkastId, skjema: props.vedtakskjema, malform: hentMalformFraData(malform) };
		return fetchOppdaterVedtakUtkast(params).catch(() => {
			setLaster(false);
			showModal(ModalType.FEIL_VED_LAGRING);
		});
	}

	function handleOnStartBeslutterProsessClicked() {
		setLaster(true);
		sendDataTilBackend().then(() => {
			fetchStartBeslutterProsess(utkastId)
				.then(() => {
					setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_BESLUTTER);
					leggTilSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);
				})
				.catch(() => showModal(ModalType.FEIL_VED_START_BESLUTTER_PROSESS))
				.finally(() => setLaster(false));
		});
	}

	function handleOnKlarTilClicked() {
		setLaster(true);
		fetchOppdaterBeslutterProsessStatus(utkastId)
			.then(() => {
				setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_BESLUTTER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_OPPDATER_BESLUTTER_PROSESS_STATUS))
			.finally(() => setLaster(false));
	}

	function handleOnBliBeslutterClicked() {
		setLaster(true);
		fetchBliBeslutter(utkastId)
			.then(() => {
				setUtkastBeslutter(innloggetVeileder.ident, innloggetVeileder.navn);
				setVeilederTilgang(VeilederTilgang.BESLUTTER);
				leggTilSystemMelding(SystemMeldingType.BLITT_BESLUTTER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_BLI_BESLUTTER))
			.finally(() => setLaster(false));
	}

	function handleOnGodkjennClicked() {
		setLaster(true);
		fetchGodkjennVedtak(utkastId)
			.then(() => {
				leggTilSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);
				setBeslutterProsessStatus(BeslutterProsessStatus.GODKJENT_AV_BESLUTTER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_GODKJENT_AV_BESLUTTER))
			.finally(() => setLaster(false));
	}

	return (
		<div className="utkast-footer__dialog-innhold">
			<div>
				<UtkastStatusMelding
					utkast={utkast!}
					veilederTilgang={veilederTilgang}
					skjemaInnsatsgruppe={innsatsgruppe}
				/>
			</div>

			<div className="utkast-footer--innhold-sidestilt">
				<Show if={visStartBeslutterProsess}>
					<Hovedknapp
						disabled={laster}
						mini={true}
						htmlType="button"
						onClick={handleOnStartBeslutterProsessClicked}
					>
						Start beslutterprosess
					</Hovedknapp>
				</Show>

				<Show if={visBliBeslutter}>
					<Hovedknapp mini={true} htmlType="button" onClick={handleOnBliBeslutterClicked} disabled={laster}>
						Bli beslutter
					</Hovedknapp>
				</Show>

				<Show if={visKlarTil}>
					<Hovedknapp mini={true} htmlType="button" onClick={handleOnKlarTilClicked} disabled={laster}>
						Send til veileder
					</Hovedknapp>
				</Show>

				<Show if={visKlarTilBeslutter}>
					<Hovedknapp mini={true} htmlType="button" onClick={handleOnKlarTilClicked} disabled={laster}>
						Send til beslutter
					</Hovedknapp>
				</Show>

				<Show if={visGodkjennUtkast}>
					<Flatknapp mini={true} htmlType="button" onClick={handleOnGodkjennClicked}>
						Godkjenn
					</Flatknapp>
				</Show>
			</div>
		</div>
	);
}
