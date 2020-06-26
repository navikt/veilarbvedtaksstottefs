import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import dialogIkon from './dialog.svg';
import { ReactComponent as TaOverIkon } from './taover.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { fetchWithInfo } from '../../../rest/utils';
import {
	lagBliBeslutterFetchInfo,
	lagGodkjennVedtakFetchInfo,
	lagOppdaterBeslutterProsessStatusFetchInfo,
} from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, trengerBeslutter } from '../../../components/utkast-skjema/skjema-utils';
import Show from '../../../components/show';
import { Element } from 'nav-frontend-typografi';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { VeilederTilgang } from '../../../utils/tilgang';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	finnGjeldendeVedtak,
	isNothing
} from '../../../utils';
import { useDataStore } from '../../../stores/data-store';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { BeslutterProsessStatus, Vedtak } from '../../../rest/data/vedtak';
import { SystemMeldingType } from '../../../utils/types/melding-type';
import './aksjoner.less';
import { DialogModal } from '../../../components/dialog-modal/dialog-modal';
import ImageButton from '../../../components/image-button/image-button';

function LesUtkastAksjoner() {
	const {
		setVeilederTilgang, erBeslutter,
		erAnsvarligVeileder, erIkkeAnsvarligVeileder
	} = useTilgangStore();
	const {
		fattedeVedtak, innloggetVeileder,
		setUtkastBeslutter, setBeslutterProsessStatus,
		leggTilSystemMelding, utkast
	} = useDataStore();
	const {changeView} = useViewStore();
	const {showModal} = useModalStore();
	const {validerSkjema, innsatsgruppe} = useSkjemaStore();

	const {
		id: utkastId,
		beslutterProsessStatus,
		beslutterNavn
	} = utkast as Vedtak;

	const [dialogModalApen, setDialogModalApen] = useState(beslutterProsessStatus != null);
	const [laster, setLaster] = useState(false);

	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);
	const godkjentAvBeslutter = erGodkjentAvBeslutter(beslutterProsessStatus);
	const visGodkjentAvBeslutter = erBeslutter && godkjentAvBeslutter;
	const visStartBeslutterProsess = trengerBeslutter(innsatsgruppe) && erAnsvarligVeileder && isNothing(beslutterNavn) && !erBeslutterProsessStartet(beslutterProsessStatus);
	const visBliBeslutter = erIkkeAnsvarligVeileder && isNothing(beslutterNavn) && erKlarTilBeslutter(beslutterProsessStatus);
	const visGodkjennUtkast = erBeslutter && !godkjentAvBeslutter;
	const visTaOverUtkast = erIkkeAnsvarligVeileder;
	const visKlarTil = (erAnsvarligVeileder && erKlarTilVeileder(beslutterProsessStatus)) || (erBeslutter && erKlarTilBeslutter(beslutterProsessStatus));
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

		fetchWithInfo(lagBliBeslutterFetchInfo({vedtakId: utkastId}))
			.then(() => {
				fokuserPaDialogSidebarTab();
				setUtkastBeslutter(innloggetVeileder.ident, innloggetVeileder.navn);
				setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_BESLUTTER);
				setVeilederTilgang(VeilederTilgang.BESLUTTER);
				leggTilSystemMelding(SystemMeldingType.BLITT_BESLUTTER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_BLI_BESLUTTER))
			.finally(() => setLaster(false));
	}

	function handleOnKlarTilClicked() {
		setLaster(true);
		fetchWithInfo(lagOppdaterBeslutterProsessStatusFetchInfo({vedtakId: utkastId}))
			.then(() => {
				setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_VEILEDER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_OPPDATER_BESLUTTER_PROSESS_STATUS))
			.finally(() => setLaster(false));
	}

	function handleOnGodkjennClicked() {
		setLaster(true);
		fetchWithInfo(lagGodkjennVedtakFetchInfo({vedtakId: utkastId}))
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
				<Tilbakeknapp
					htmlType="button"
					onClick={handleOnTilbakeClicked}
					disabled={laster}
				/>
			</div>

			<div className="aksjoner__knapper-midten">
				<Show if={laster}>
					<NavFrontendSpinner type="XS" />
				</Show>
				<Show if={visBliBeslutter}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleOnBliBeslutterClicked}
						disabled={laster}
					>
						Bli beslutter
					</Hovedknapp>
				</Show>
				<Show if={visKlarTil}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleOnKlarTilClicked}
						disabled={laster}
					>
						Klar til veileder
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
						<TaOverIkon className="aksjoner__ikon"/>
						Ta over
					</Flatknapp>
				</Show>

				<Show if={visGodkjennUtkast}>
					<Flatknapp
						mini={true}
						htmlType="button"
						onClick={handleOnGodkjennClicked}
					>
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
				<DialogModal open={dialogModalApen} onRequestClose={() => setDialogModalApen(false)}/>
			</div>
		</div>
	);
}

export default LesUtkastAksjoner;
