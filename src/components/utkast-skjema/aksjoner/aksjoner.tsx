import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { ReactComponent as TaOverIkon } from './locked.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { SkjemaData } from '../../../pages/utkast/utkast-side';
import { fetchWithInfo, hasOkStatus } from '../../../rest/utils';
import { ReactComponent as SlettIkon } from './delete.svg';
import {
	lagBliBeslutterFetchInfo,
	lagGodkjennVedtakFetchInfo,
	lagOppdaterVedtakUtkastFetchInfo,
	lagStartBeslutterProsessFetchInfo
} from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { useFetchStore } from '../../../stores/fetch-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, trengerBeslutter } from '../skjema-utils';
import Show from '../../show';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useInnloggetVeilederStore } from '../../../stores/innlogget-veileder-store';
import { erBeslutter, erIkkeAnsvarligVeileder } from '../../../utils/tilgang';
import { finnUtkastAlltid } from '../../../utils';
import './aksjoner.less';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function Aksjoner(props: UtkastAksjonerProps) {
	const {fnr} = useAppStore();
	const {kanEndreUtkast, veilederTilgang} = useInnloggetVeilederStore();
	const {vedtak, malform} = useFetchStore();
	const {changeView} = useViewStore();
	const {showModal} = useModalStore();
	const {validerSkjema, innsatsgruppe} = useSkjemaStore();

	const [laster, setLaster] = useState(false);

	const utkast = finnUtkastAlltid(vedtak.data);
	const godkjentAvBeslutter = utkast.godkjentAvBeslutter;
	const visKlarTilBeslutter = !utkast.beslutterProsessStartet && trengerBeslutter(innsatsgruppe);
	const visBliBeslutter = utkast.beslutterProsessStartet && utkast.beslutterIdent == null && erIkkeAnsvarligVeileder(veilederTilgang);
	const visGodkjennUtkast = utkast.beslutterProsessStartet && !godkjentAvBeslutter && erBeslutter(veilederTilgang);
	const visTaOverUtkast = erIkkeAnsvarligVeileder(veilederTilgang);
	const visSendEndringer = false; // TODO: Implement later

	function sendDataTilBackend() {
		const params = {fnr, skjema: props.vedtakskjema, malform: hentMalformFraData(malform.data)};
		return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo(params))
			.catch(() => {
				setLaster(false);
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}

	function refreshDataFraBackend() {
		return new Promise((resolve, reject) => {
			vedtak.fetch({fnr}, (state) => {
				console.log('refresh fra backend', state.data); // tslint:disable-line
				if (hasOkStatus(state)) {
					resolve();
				} else {
					reject();
				}
			});
		});
	}

	function handleOnForhandsvisClicked() {
		const skjemaFeil = validerSkjema(vedtak.data);

		if (harFeil(skjemaFeil)) {
			scrollTilForsteFeil(skjemaFeil);
			props.harForsoktForhandsvisning();
			return;
		}

		if (kanEndreUtkast) {
			setLaster(true);
			sendDataTilBackend().then(() => {
				// TODO: Skal vi refreshe data fra backend?
				changeView(ViewType.FORHANDSVISNING);
			});
		} else {
			changeView(ViewType.FORHANDSVISNING);
		}
	}

	function handleOnTilbakeClicked() {
		if (kanEndreUtkast) {
			setLaster(true);
			sendDataTilBackend()
				.then(refreshDataFraBackend)
				.then(() => {
					changeView(ViewType.HOVEDSIDE);
				});
		} else {
			changeView(ViewType.HOVEDSIDE);
		}
	}

	function handleOnStartBeslutterProsessClicked() {
		setLaster(true);

		sendDataTilBackend().then(() => {
			console.log('start beslutter'); // tslint:disable-line
			fetchWithInfo(lagStartBeslutterProsessFetchInfo({fnr}))
				.then(refreshDataFraBackend)
				.catch(() => {
					showModal(ModalType.FEIL_VED_START_BESLUTTER_PROSESS);
				}).finally(() => setLaster(false));
		});
	}

	function handleOnBliBeslutterClicked() {
		setLaster(true);

		fetchWithInfo(lagBliBeslutterFetchInfo({fnr}))
			.then(refreshDataFraBackend)
			.catch(() => {
				showModal(ModalType.FEIL_VED_BLI_BESLUTTER);
			}).finally(() => setLaster(false));
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
			.then(refreshDataFraBackend)
			.then(() => {
				setLaster(false);
			})
			.catch(() => {
				setLaster(false);
				showModal(ModalType.FEIL_VED_BLI_BESLUTTER);
			});
	}

	return (
		<div className="aksjoner">
			<Tilbakeknapp
				htmlType="button"
				onClick={handleOnTilbakeClicked}
				disabled={laster}
			/>

			<div className="aksjoner__knapper">
				<Show if={visKlarTilBeslutter}>
					<Knapp
						spinner={laster}
						disabled={laster}
						mini={true}
						htmlType="button"
						onClick={handleOnStartBeslutterProsessClicked}
					>
						Klar til beslutter
					</Knapp>
				</Show>
				<Show if={visBliBeslutter}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleOnBliBeslutterClicked}
					>
						Bli beslutter
					</Hovedknapp>
				</Show>
				<Show if={visSendEndringer}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleOnSendEndringerClicked}
					>
						Send endringer
					</Hovedknapp>
				</Show>
				<Hovedknapp
					spinner={laster}
					disabled={laster}
					mini={true}
					htmlType="button"
					onClick={handleOnForhandsvisClicked}
				>
					Forhåndsvis
				</Hovedknapp>
			</div>

			<div>
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
				<Show if={godkjentAvBeslutter}>
					<Element>Godkjent</Element>
				</Show>
			</div>
		</div>
	);
}

export default Aksjoner;
