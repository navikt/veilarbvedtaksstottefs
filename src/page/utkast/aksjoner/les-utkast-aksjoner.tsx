import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import dialogIkon from './dialog.svg';
import { ReactComponent as TaOverIkon } from './taover.svg';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { useViewStore, ViewType } from '../../../store/view-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import { harFeil, trengerBeslutter } from '../../../util/skjema-utils';
import Show from '../../../component/show';
import { Element } from 'nav-frontend-typografi';
import { useTilgangStore } from '../../../store/tilgang-store';
import { VeilederTilgang } from '../../../util/tilgang';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	finnGjeldendeVedtak,
	isNothing
} from '../../../util';
import { useDataStore } from '../../../store/data-store';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { SystemMeldingType } from '../../../util/type/melding-type';
import './aksjoner.less';
import { DialogModal } from '../../../component/dialog-modal/dialog-modal';
import ImageButton from '../../../component/image-button/image-button';
import { BeslutterProsessStatus, Vedtak } from '../../../api/veilarbvedtaksstotte';
import {
	bliBeslutter,
	godkjennVedtak,
	oppdaterBeslutterProsessStatus
} from '../../../api/veilarbvedtaksstotte/beslutter';

function LesUtkastAksjoner() {
	const { setVeilederTilgang, erBeslutter, erAnsvarligVeileder, erIkkeAnsvarligVeileder } = useTilgangStore();
	const {
		fattedeVedtak,
		innloggetVeileder,
		setUtkastBeslutter,
		leggTilSystemMelding,
		utkast,
		setBeslutterProsessStatus
	} = useDataStore();
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const { validerSkjema, innsatsgruppe } = useSkjemaStore();

	const { id: utkastId, beslutterNavn, beslutterProsessStatus } = utkast as Vedtak;

	const [dialogModalApen, setDialogModalApen] = useState(erBeslutterProsessStartet(beslutterProsessStatus));
	const [laster, setLaster] = useState(false);

	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);
	const godkjentAvBeslutter = erGodkjentAvBeslutter(beslutterProsessStatus);
	const visGodkjentAvBeslutter = erBeslutter && godkjentAvBeslutter;
	const visStartBeslutterProsess =
		trengerBeslutter(innsatsgruppe) &&
		erAnsvarligVeileder &&
		isNothing(beslutterNavn) &&
		!erBeslutterProsessStartet(beslutterProsessStatus);
	const visBliBeslutter =
		erIkkeAnsvarligVeileder && isNothing(beslutterNavn) && erKlarTilBeslutter(beslutterProsessStatus);
	const visGodkjennUtkast = erBeslutterProsessStartet(beslutterProsessStatus) && erBeslutter && !godkjentAvBeslutter;
	const visTaOverUtkast = erIkkeAnsvarligVeileder;
	const visKlarTil =
		erBeslutterProsessStartet(beslutterProsessStatus) &&
		((erAnsvarligVeileder && erKlarTilVeileder(beslutterProsessStatus)) ||
			(erBeslutter && erKlarTilBeslutter(beslutterProsessStatus)));
	const erForhandsvisHovedknapp = !visStartBeslutterProsess && !visBliBeslutter && !visKlarTil;

	function fokuserPaDialogSidebarTab() {
		setDialogModalApen(true);
	}

	function handleOnForhandsvisClicked() {
		const skjemaFeil = validerSkjema(gjeldendeVedtak);

		if (harFeil(skjemaFeil)) {
			showModal(ModalType.FEIL_VED_VALIDERING_AV_UTKAST);
			return;
		}

		changeView(ViewType.FORHANDSVISNING);
	}

	function handleOnTilbakeClicked() {
		changeView(ViewType.HOVEDSIDE);
	}

	function handleOnBliBeslutterClicked() {
		setLaster(true);

		bliBeslutter(utkastId)
			.then(() => {
				fokuserPaDialogSidebarTab();
				setUtkastBeslutter(innloggetVeileder.ident, innloggetVeileder.navn);
				setVeilederTilgang(VeilederTilgang.BESLUTTER);
				leggTilSystemMelding(SystemMeldingType.BLITT_BESLUTTER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_BLI_BESLUTTER))
			.finally(() => setLaster(false));
	}

	function handleOnKlarTilClicked() {
		setLaster(true);
		oppdaterBeslutterProsessStatus(utkastId)
			.then(() => {
				setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_VEILEDER);
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
		<div className="aksjoner">
			<div className="aksjoner__knapper-venstre">
				<Tilbakeknapp htmlType="button" onClick={handleOnTilbakeClicked} disabled={laster} />
			</div>

			<div className="aksjoner__knapper-midten">
				<Show if={laster}>
					<NavFrontendSpinner type="XS" />
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
				<Knapp
					type={erForhandsvisHovedknapp ? 'hoved' : 'standard'}
					disabled={laster}
					mini={true}
					htmlType="button"
					onClick={handleOnForhandsvisClicked}
				>
					Forhåndsvis
				</Knapp>
			</div>

			<div className="aksjoner__knapper-hoyre">
				<Show if={visTaOverUtkast}>
					<Flatknapp
						mini={true}
						htmlType="button"
						onClick={() => showModal(ModalType.BEKREFT_TA_OVER_UTKAST)}
						disabled={laster}
					>
						<TaOverIkon className="aksjoner__ikon" />
						Ta over
					</Flatknapp>
				</Show>

				<Show if={visGodkjennUtkast}>
					<Flatknapp mini={true} htmlType="button" onClick={handleOnGodkjennClicked}>
						Godkjenn
					</Flatknapp>
				</Show>

				<Show if={visGodkjentAvBeslutter}>
					<Element>Godkjent</Element>
				</Show>

				<ImageButton
					src={dialogIkon}
					alt="Snakkebobler"
					onClick={() => setDialogModalApen(apen => !apen)}
					className="aksjoner__dialog-knapp"
					imgClassName="aksjoner__dialog-knapp-ikon"
				/>
				<DialogModal open={dialogModalApen} onRequestClose={() => setDialogModalApen(false)} />
			</div>
		</div>
	);
}

export default LesUtkastAksjoner;
