import { useState } from 'react';
import { UtkastStatusMelding } from './utkast-status-melding';
import { hentMalformFraData, SkjemaData, trengerKvalitetssikrer } from '../../../util/skjema-utils';
import { useTilgangStore } from '../../../store/tilgang-store';
import { useDataStore } from '../../../store/data-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { BeslutterProsessStatus, Utkast } from '../../../api/veilarbvedtaksstotte';
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
	godkjennVedtak,
	fetchStartBeslutterProsess,
	oppdaterBeslutterProsessStatus
} from '../../../api/veilarbvedtaksstotte/beslutter';
import { VeilederTilgang } from '../../../util/tilgang';
import { useDialogSection } from '../../../store/dialog-section-store';
import { Button } from '@navikt/ds-react';

interface DialogFooterInnholdProps {
	vedtakskjema: SkjemaData;
}

export function DialogInnhold(props: DialogFooterInnholdProps) {
	const { erBeslutter, erAnsvarligVeileder, erIkkeAnsvarligVeileder, veilederTilgang, setVeilederTilgang } =
		useTilgangStore();
	const { malform, utkast, leggTilSystemMelding, innloggetVeileder, setUtkastBeslutter, setBeslutterProsessStatus } =
		useDataStore();
	const { showSection } = useDialogSection();
	const { hideModal, showModal } = useModalStore();
	const { innsatsgruppe } = useSkjemaStore();
	const { id: utkastId, beslutterNavn, beslutterProsessStatus } = utkast as Utkast;

	const [laster, setLaster] = useState(false);

	const visStartBeslutterProsess =
		erAnsvarligVeileder &&
		trengerKvalitetssikrer(innsatsgruppe) &&
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

	return (
		<div className="utkast-footer__dialog-innhold">
			<UtkastStatusMelding
				utkast={utkast!}
				veilederTilgang={veilederTilgang}
				skjemaInnsatsgruppe={innsatsgruppe}
				minified={!showSection}
			/>

			{showSection && (
				<div className="utkast-footer--innhold-sidestilt">
					{visStartBeslutterProsess && (
						<Button loading={laster} onClick={handleOnStartBeslutterProsessClicked}>
							Start kvalitetssikring
						</Button>
					)}

					{visBliBeslutter && (
						<Button loading={laster} onClick={handleOnBliBeslutterClicked}>
							Bli kvalitetssikrer
						</Button>
					)}

					{visSendTilVeileder && (
						<Button loading={laster} onClick={handleOnSendTilClicked}>
							Send til veileder
						</Button>
					)}

					{visSendTilBeslutter && (
						<Button loading={laster} onClick={handleOnSendTilClicked}>
							Send til kvalitetssikrer
						</Button>
					)}

					{visGodkjennUtkast && (
						<Button
							variant="tertiary"
							loading={laster}
							onClick={() =>
								showModal(ModalType.BEKREFT_SEND_TIL_GODKJENNING, {
									onGodkjennVedtakBekreftet: handleGodkjennVedtak
								})
							}
						>
							Godkjenn
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
