import React, { useState } from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { UtkastStatusMelding } from './utkast-status-melding';
import { hentMalformFraData, SkjemaData, trengerBeslutter } from '../../../util/skjema-utils';
import { useTilgangStore } from '../../../store/tilgang-store';
import { useDataStore } from '../../../store/data-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { BeslutterProsessStatus, Vedtak } from '../../../api/veilarbvedtaksstotte';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	isNothing
} from '../../../util';
import { oppdaterVedtakUtkast } from '../../../api/veilarbvedtaksstotte/utkast';
import { SystemMeldingType } from '../../../util/type/melding-type';
import {
	bliBeslutter,
	fetchStartBeslutterProsess,
	godkjennVedtak,
	oppdaterBeslutterProsessStatus
} from '../../../api/veilarbvedtaksstotte/beslutter';
import { VeilederTilgang } from '../../../util/tilgang';
import Show from '../../../component/show';
import { useDialogSection } from '../../../store/dialog-section-store';

interface DialogFooterInnholdProps {
	vedtakskjema: SkjemaData;
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
	const { showSection } = useDialogSection();
	const { showModal } = useModalStore();
	const { innsatsgruppe } = useSkjemaStore();
	const { id: utkastId, beslutterNavn, beslutterProsessStatus } = utkast as Vedtak;

	const [laster, setLaster] = useState(false);

	const visStartBeslutterProsess =
		erAnsvarligVeileder &&
		trengerBeslutter(innsatsgruppe) &&
		isNothing(beslutterNavn) &&
		!erBeslutterProsessStartet(beslutterProsessStatus);

	const visSendTilBeslutter = erAnsvarligVeileder && erKlarTilVeileder(beslutterProsessStatus);

	const visSendTilVeileder =
		erBeslutter && erBeslutterProsessStartet(beslutterProsessStatus) && erKlarTilBeslutter(beslutterProsessStatus);

	const visGodkjennUtkast =
		erBeslutter &&
		erBeslutterProsessStartet(beslutterProsessStatus) &&
		!erGodkjentAvBeslutter(beslutterProsessStatus);

	const visBliBeslutter =
		erIkkeAnsvarligVeileder && isNothing(beslutterNavn) && erKlarTilBeslutter(beslutterProsessStatus);

	function sendDataTilBackend() {
		// Vi oppdaterer ikke lagringStatus her fordi det blir rart at dette trigges på en "urelatert" handling
		return oppdaterVedtakUtkast(utkastId, hentMalformFraData(malform), props.vedtakskjema).catch(() => {
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

	function handleOnBliBeslutterClicked() {
		setLaster(true);
		bliBeslutter(utkastId)
			.then(() => {
				setUtkastBeslutter(innloggetVeileder.ident, innloggetVeileder.navn);
				setVeilederTilgang(VeilederTilgang.BESLUTTER);
				leggTilSystemMelding(SystemMeldingType.BLITT_BESLUTTER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_BLI_BESLUTTER))
			.finally(() => setLaster(false));
	}

	function handleOnSendTilClicked() {
		setLaster(true);
		oppdaterBeslutterProsessStatus(utkastId)
			.then(() => {
				const status = erAnsvarligVeileder
					? BeslutterProsessStatus.KLAR_TIL_BESLUTTER
					: BeslutterProsessStatus.KLAR_TIL_VEILEDER;

				setBeslutterProsessStatus(status);
			})
			.catch(() => showModal(ModalType.FEIL_VED_OPPDATER_BESLUTTER_PROSESS_STATUS))
			.finally(() => setLaster(false));
	}

	function handleOnGodkjennClicked() {
		setLaster(true);
		godkjennVedtak(utkastId)
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
					minified={!showSection}
				/>
			</div>

			<Show if={showSection}>
				<div className="utkast-footer--innhold-sidestilt">
					<Show if={visStartBeslutterProsess}>
						<Hovedknapp
							disabled={laster}
							mini={true}
							htmlType="button"
							onClick={handleOnStartBeslutterProsessClicked}
						>
							Start kvalitetssikring
						</Hovedknapp>
					</Show>

					<Show if={visBliBeslutter}>
						<Hovedknapp
							mini={true}
							htmlType="button"
							onClick={handleOnBliBeslutterClicked}
							disabled={laster}
						>
							Bli kvalitetssikrer
						</Hovedknapp>
					</Show>

					<Show if={visSendTilVeileder}>
						<Hovedknapp mini={true} htmlType="button" onClick={handleOnSendTilClicked} disabled={laster}>
							Send til veileder
						</Hovedknapp>
					</Show>

					<Show if={visSendTilBeslutter}>
						<Hovedknapp mini={true} htmlType="button" onClick={handleOnSendTilClicked} disabled={laster}>
							Send til kvalitetssikrer
						</Hovedknapp>
					</Show>

					<Show if={visGodkjennUtkast}>
						<Flatknapp
							className="utkast-footer__godkjenn-knapp"
							mini={true}
							htmlType="button"
							onClick={handleOnGodkjennClicked}
						>
							Godkjenn
						</Flatknapp>
					</Show>
				</div>
			</Show>
		</div>
	);
}
