import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import dialogIkon from './dialog.svg';
import { ReactComponent as TaOverIkon } from './taover.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { SkjemaData } from '../../../pages/utkast/utkast-side';
import { fetchWithInfo } from '../../../rest/utils';
import { ReactComponent as SlettIkon } from './delete.svg';
import {
	lagBliBeslutterFetchInfo,
	lagGodkjennVedtakFetchInfo,
	lagOppdaterBeslutterProsessStatusFetchInfo,
	lagOppdaterVedtakUtkastFetchInfo,
	lagStartBeslutterProsessFetchInfo
} from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, trengerBeslutter } from '../skjema-utils';
import Show from '../../show';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { VeilederTilgang } from '../../../utils/tilgang';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	finnUtkastAlltid,
	isNothing, mapSkjemaLagringStatusTilTekst
} from '../../../utils';
import { useDataStore } from '../../../stores/data-store';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { BeslutterProsessStatus } from '../../../rest/data/vedtak';
import { SystemMeldingType } from '../../../utils/types/melding-type';
import './aksjoner.less';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import ImageButton from '../../image-button/image-button';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function Aksjoner(props: UtkastAksjonerProps) {
	const {fnr} = useAppStore();
	const {
		kanEndreUtkast,
		setVeilederTilgang, erBeslutter,
		erAnsvarligVeileder, erIkkeAnsvarligVeileder
	} = useTilgangStore();
	const {
		malform, vedtak, innloggetVeileder,
		setUtkastBeslutter, setBeslutterProsessStatus,
		leggTilSystemMelding
	} = useDataStore();
	const {changeView} = useViewStore();
	const {showModal} = useModalStore();
	const {validerSkjema, innsatsgruppe, lagringStatus} = useSkjemaStore();

	const utkast = finnUtkastAlltid(vedtak);
	const [dialogModalApen, setDialogModalApen] = useState(utkast.beslutterProsessStatus != null);
	const [laster, setLaster] = useState(false);

	const beslutterProsessStatus = utkast.beslutterProsessStatus;
	const godkjentAvBeslutter = erGodkjentAvBeslutter(beslutterProsessStatus);
	const visGodkjentAvBeslutter = erBeslutter && godkjentAvBeslutter;
	const visStartBeslutterProsess = trengerBeslutter(innsatsgruppe) && erAnsvarligVeileder && isNothing(utkast.beslutterNavn) && !erBeslutterProsessStartet(beslutterProsessStatus);
	const visBliBeslutter = erIkkeAnsvarligVeileder && isNothing(utkast.beslutterNavn) && erKlarTilBeslutter(beslutterProsessStatus) ;
	const visGodkjennUtkast = erBeslutter && !godkjentAvBeslutter;
	const visTaOverUtkast = erIkkeAnsvarligVeileder;
	const visKlarTil = (erAnsvarligVeileder && erKlarTilVeileder(beslutterProsessStatus)) || (erBeslutter && erKlarTilBeslutter(beslutterProsessStatus));
	const erForhandsvisHovedknapp = !visStartBeslutterProsess && !visBliBeslutter && !visKlarTil;

	function fokuserPaDialogSidebarTab() {
		setDialogModalApen(true);
	}

	function sendDataTilBackend() {
		// Vi oppdaterer ikke lagringStatus her fordi det blir rart at dette trigges på en "urelatert" handling
		const params = {fnr, skjema: props.vedtakskjema, malform: hentMalformFraData(malform)};
		return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo(params))
			.catch(() => {
				setLaster(false);
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}

	function handleOnForhandsvisClicked() {
		const skjemaFeil = validerSkjema(vedtak);

		if (harFeil(skjemaFeil)) {
			scrollTilForsteFeil(skjemaFeil);
			props.harForsoktForhandsvisning();
			return;
		}

		if (kanEndreUtkast) {
			setLaster(true);
			sendDataTilBackend()
				.then(() => changeView(ViewType.FORHANDSVISNING));
		} else {
			changeView(ViewType.FORHANDSVISNING);
		}
	}

	function handleOnTilbakeClicked() {
		if (kanEndreUtkast) {
			setLaster(true);
			sendDataTilBackend()
				.then(() => changeView(ViewType.HOVEDSIDE));
		} else {
			changeView(ViewType.HOVEDSIDE);
		}
	}

	function handleOnStartBeslutterProsessClicked() {
		setLaster(true);
		sendDataTilBackend()
			.then(() => {
				fetchWithInfo(lagStartBeslutterProsessFetchInfo({fnr}))
					.then(() => {
						fokuserPaDialogSidebarTab();
						setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_BESLUTTER);
						leggTilSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);
					})
					.catch(() => showModal(ModalType.FEIL_VED_START_BESLUTTER_PROSESS))
					.finally(() => setLaster(false));
			});
	}

	function handleOnBliBeslutterClicked() {
		setLaster(true);

		fetchWithInfo(lagBliBeslutterFetchInfo({fnr}))
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

		fetchWithInfo(lagOppdaterBeslutterProsessStatusFetchInfo({fnr}))
			.then(() => {
				const status = erBeslutter
					? BeslutterProsessStatus.KLAR_TIL_VEILEDER
					: BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

				setBeslutterProsessStatus(status);
			})
			.catch(() => showModal(ModalType.FEIL_VED_OPPDATER_BESLUTTER_PROSESS_STATUS))
			.finally(() => setLaster(false));
	}

	function handleOnGodkjennClicked() {
		setLaster(true);
		fetchWithInfo(lagGodkjennVedtakFetchInfo({fnr}))
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
				<div className="aksjoner__lagring-tekst">
					<Normaltekst>
						{mapSkjemaLagringStatusTilTekst(lagringStatus)}
					</Normaltekst>
				</div>
			</div>

			<div className="aksjoner__knapper-midten">
				<Show if={laster}>
					<NavFrontendSpinner type="XS" />
				</Show>
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
						Klar til {erBeslutter ? 'veileder' : 'beslutter'}
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
				<Show if={kanEndreUtkast}>
					<Flatknapp
						mini={true}
						htmlType="button"
						onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
						disabled={laster}
					>
						<SlettIkon className="aksjoner__ikon"/>
						Slett
					</Flatknapp>
				</Show>

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

export default Aksjoner;
