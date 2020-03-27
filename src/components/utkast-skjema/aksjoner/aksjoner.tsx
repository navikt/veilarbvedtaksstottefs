import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { ReactComponent as TaOverIkon } from './locked.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { SkjemaData } from '../../../pages/utkast/utkast-side';
import { fetchWithInfo } from '../../../rest/utils';
import { ReactComponent as SlettIkon } from './delete.svg';
import {
	lagBliBeslutterFetchInfo,
	lagGodkjennVedtakFetchInfo,
	lagOppdaterVedtakUtkastFetchInfo,
	lagStartBeslutterProsessFetchInfo
} from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, trengerBeslutter } from '../skjema-utils';
import Show from '../../show';
import { Element } from 'nav-frontend-typografi';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { erAnsvarligVeileder, erBeslutter, erIkkeAnsvarligVeileder, VeilederTilgang } from '../../../utils/tilgang';
import { finnUtkastAlltid } from '../../../utils';
import { useDataStore } from '../../../stores/data-store';
import './aksjoner.less';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function Aksjoner(props: UtkastAksjonerProps) {
	const {fnr} = useAppStore();
	const {kanEndreUtkast, veilederTilgang, setVeilederTilgang} = useTilgangStore();
	const {
		malform, vedtak, innloggetVeileder,
		setUtkastBeslutterProsessStartet, setUtkastBeslutter,
		setUtkastGodkjent, leggTilSystemMelding
	} = useDataStore();
	const {changeView} = useViewStore();
	const {showModal} = useModalStore();
	const {validerSkjema, innsatsgruppe} = useSkjemaStore();

	const [laster, setLaster] = useState(false);

	const utkast = finnUtkastAlltid(vedtak);
	const godkjentAvBeslutter = utkast.godkjentAvBeslutter;
	const visGodkjentAvBeslutter = utkast.godkjentAvBeslutter && erBeslutter(veilederTilgang);
	const visKlarTilBeslutter = !utkast.beslutterProsessStartet && trengerBeslutter(innsatsgruppe) && erAnsvarligVeileder(veilederTilgang);
	const visBliBeslutter = utkast.beslutterProsessStartet && utkast.beslutterIdent == null && erIkkeAnsvarligVeileder(veilederTilgang);
	const visGodkjennUtkast = utkast.beslutterProsessStartet && !godkjentAvBeslutter && erBeslutter(veilederTilgang);
	const visTaOverUtkast = erIkkeAnsvarligVeileder(veilederTilgang);
	const visSendEndringer = false; // TODO: Implement later
	const erForhandsvisHovedknapp = !visKlarTilBeslutter && !visBliBeslutter && !visSendEndringer;

	function sendDataTilBackend() {
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
						setUtkastBeslutterProsessStartet();
						leggTilSystemMelding('Utkast klar for beslutter');
					})
					.catch(() => showModal(ModalType.FEIL_VED_START_BESLUTTER_PROSESS))
					.finally(() => setLaster(false));
			});
	}

	function handleOnBliBeslutterClicked() {
		setLaster(true);

		fetchWithInfo(lagBliBeslutterFetchInfo({fnr}))
			.then(() => {
				setUtkastBeslutter(innloggetVeileder.ident, innloggetVeileder.navn);
				setVeilederTilgang(VeilederTilgang.BESLUTTER);
				leggTilSystemMelding(`${innloggetVeileder.navn} er beslutter`);
			})
			.catch(() => showModal(ModalType.FEIL_VED_BLI_BESLUTTER))
			.finally(() => setLaster(false));
	}

	function handleOnSendEndringerClicked() {
		alert('TODO: Not implemented yet');
		// setVisLaster(true);
		//
		// sendDataTilBackend().then(() => {
		// 	setVisLaster(false);
		// 	changeView(ViewType.UTKAST);
		// });
	}

	function handleOnGodkjennClicked() {
		setLaster(true);
		fetchWithInfo(lagGodkjennVedtakFetchInfo({fnr}))
			.then(() => {
				setUtkastGodkjent();
				leggTilSystemMelding(`Kvalifisert av ${innloggetVeileder.navn}`);
			})
			.catch(() => showModal(ModalType.FEIL_VED_BLI_BESLUTTER))
			.finally(() => setLaster(false));
	}

	return (
		<div className="aksjoner">
			<Tilbakeknapp
				htmlType="button"
				onClick={handleOnTilbakeClicked}
				disabled={laster}
			/>

			<div className="aksjoner__knapper-midten">
				<Show if={laster}>
					<NavFrontendSpinner type="XS" />
				</Show>
				<Show if={visKlarTilBeslutter}>
					<Hovedknapp
						disabled={laster}
						mini={true}
						htmlType="button"
						onClick={handleOnStartBeslutterProsessClicked}
					>
						Klar til beslutter
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
				<Show if={visSendEndringer}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleOnSendEndringerClicked}
						disabled={laster}
					>
						Send endringer
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
			</div>
		</div>
	);
}

export default Aksjoner;
