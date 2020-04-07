import React, {useState} from 'react';
import {Flatknapp, Hovedknapp, Knapp} from 'nav-frontend-knapper';
import {Tilbakeknapp} from 'nav-frontend-ikonknapper';
import {ReactComponent as TaOverIkon} from './locked.svg';
import {ModalType, useModalStore} from '../../../stores/modal-store';
import {SkjemaData} from '../../../pages/utkast/utkast-side';
import {fetchWithInfo} from '../../../rest/utils';
import {ReactComponent as SlettIkon} from './delete.svg';
import {
	lagBliBeslutterFetchInfo,
	lagGodkjennVedtakFetchInfo,
	lagOppdaterBeslutterProsessStatusFetchInfo,
	lagOppdaterVedtakUtkastFetchInfo,
	lagStartBeslutterProsessFetchInfo
} from '../../../rest/api';
import {useViewStore, ViewType} from '../../../stores/view-store';
import {useAppStore} from '../../../stores/app-store';
import {useSkjemaStore} from '../../../stores/skjema-store';
import {harFeil, hentMalformFraData, scrollTilForsteFeil, trengerBeslutter} from '../skjema-utils';
import Show from '../../show';
import {Element} from 'nav-frontend-typografi';
import {useTilgangStore} from '../../../stores/tilgang-store';
import {VeilederTilgang} from '../../../utils/tilgang';
import {erKlarTilBeslutter, erKlarTilVeileder, finnUtkastAlltid} from '../../../utils';
import {useDataStore} from '../../../stores/data-store';
import NavFrontendSpinner from 'nav-frontend-spinner';
import {BeslutterProsessStatus} from '../../../rest/data/vedtak';
import {SystemMeldingType} from '../../../utils/types/melding-type';
import './aksjoner.less';

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
		setUtkastBeslutterProsessStartet, setUtkastBeslutter,
		setUtkastGodkjent, setBeslutterProsessStatus,
		leggTilSystemMelding
	} = useDataStore();
	const {changeView} = useViewStore();
	const {showModal} = useModalStore();
	const {validerSkjema, innsatsgruppe} = useSkjemaStore();

	const [laster, setLaster] = useState(false);

	const utkast = finnUtkastAlltid(vedtak);
	const godkjentAvBeslutter = utkast.godkjentAvBeslutter;
	const visGodkjentAvBeslutter = utkast.godkjentAvBeslutter && erBeslutter;
	const visStartBeslutterProsess = !utkast.beslutterProsessStartet && trengerBeslutter(innsatsgruppe) && erAnsvarligVeileder;
	const visBliBeslutter = utkast.beslutterProsessStartet && utkast.beslutterIdent == null && erIkkeAnsvarligVeileder;
	const visGodkjennUtkast = utkast.beslutterProsessStartet && !godkjentAvBeslutter && erBeslutter;
	const visTaOverUtkast = erIkkeAnsvarligVeileder;
	const visKlarTil =
		(erAnsvarligVeileder && erKlarTilVeileder(utkast)) ||
		(erBeslutter && erKlarTilBeslutter(utkast));
	const erForhandsvisHovedknapp = !visStartBeslutterProsess && !visBliBeslutter && !visKlarTil;

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
				.then(() => {
					changeView(ViewType.HOVEDSIDE);
					leggTilSystemMelding(SystemMeldingType.UTKAST_OPPRETTET);
				});
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
			.then(() => setUtkastGodkjent())
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
			</div>
		</div>
	);
}

export default Aksjoner;
