import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { ReactComponent as TaOverIkon } from './locked.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { SkjemaData } from '../../../pages/vedtakskjema/vedtakskjema-side';
import { fetchWithInfo, hasFinishedWithData } from '../../../rest/utils';
import { ReactComponent as SlettIkon } from './delete.svg';
import {
	lagOppdaterVedtakUtkastFetchInfo,
	lagKlarTilBeslutter,
	lagBliBeslutter, lagGodkjennVedtak
} from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { useFetchStore } from '../../../stores/fetch-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, trengerBeslutter } from '../skjema-utils';
import Show from '../../show';
import { useBeslutterStore } from '../../../stores/beslutter-store';
import './aksjoner.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function UtkastAksjoner(props: UtkastAksjonerProps) {
	const { fnr } = useAppStore();
	const { vedtak, malform, innloggetVeileder } = useFetchStore();
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const { validerSkjema, innsatsgruppe, isReadOnly } = useSkjemaStore();
	const { beslutterProsessStartet, setBeslutterProsessStartet,
		    harBeslutter, setHarBeslutter,
		    godkjentAvBeslutter, setGodkjentAvBeslutter,
		    visSendEndringer, setVisSendEndringer } = useBeslutterStore();

	const [visKlarTilBeslutterLaster, setVisKlarTilBeslutterLaster] = useState(false);
	const [visForhandsvisngLaster, setVisForhandsvisngLaster] = useState(false);
	const [visLagreVedtakLaster, setVisLagreVedtakLaster] = useState(false);
	const [visBliBeslutterLaster, setVisBliBeslutterLaster] = useState(false);
	const [visGodkjennesLaster, setVisGodkjennesLaster] = useState(false);
	const [visSendEndringerLaster, setVisSendEndringerLaster] = useState(false);

	const visKlarTilBeslutter = !isReadOnly && (trengerBeslutter(innsatsgruppe) && !beslutterProsessStartet);
	const visBliBeslutter = isReadOnly && (beslutterProsessStartet && !harBeslutter);
	const visGodkjenne = isReadOnly && harBeslutter && !godkjentAvBeslutter;

	function sendDataTilBackend() {
		const params = {fnr, skjema: props.vedtakskjema, malform: hentMalformFraData(malform.data)};
		return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo(params))
			.catch(() => {
				setVisForhandsvisngLaster(false);
				setVisLagreVedtakLaster(false);
				setVisKlarTilBeslutterLaster(false);
				setVisBliBeslutterLaster(false);
				setVisGodkjennesLaster(false);
				setVisSendEndringerLaster(false);
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}

	function handleForhandsvisOgLagre() {
		const skjemaFeil = validerSkjema(vedtak.data);

		if (harFeil(skjemaFeil)) {
			scrollTilForsteFeil(skjemaFeil);
			props.harForsoktForhandsvisning();
			return;
		}

		setVisForhandsvisngLaster(true);

		sendDataTilBackend().then(() => {
			changeView(ViewType.FORHANDSVISNING);
		});
	}

	function handleForhandsvis() {
		const skjemaFeil = validerSkjema(vedtak.data);

		if (harFeil(skjemaFeil)) return;

		setVisForhandsvisngLaster(true);
		changeView(ViewType.FORHANDSVISNING);
	}

	function handleLagreOgTilbake() {
		setVisLagreVedtakLaster(true);

		sendDataTilBackend().then(() => {
			vedtak.fetch({ fnr });
			changeView(ViewType.HOVEDSIDE);
		});
	}

	function handleTilbake() {
		setVisLagreVedtakLaster(true);
		changeView(ViewType.HOVEDSIDE);
	}

	function handleKlarTilBeslutter() {
		setVisKlarTilBeslutterLaster(true);

		sendDataTilBackend().then(() => {
			fetchWithInfo(lagKlarTilBeslutter({fnr}))
				.then(() => {
					setVisKlarTilBeslutterLaster(false);
					setBeslutterProsessStartet(true);
					setHarBeslutter(false);
				})
				.catch(() => {
					setVisKlarTilBeslutterLaster(false);
					showModal(ModalType.FEIL_VED_START_BESLUTTER_PROSESS);
				});
		});
	}

	function handleBliBeslutter() {
		setVisBliBeslutterLaster(true);

			fetchWithInfo(lagBliBeslutter({fnr}))
				.then(() => {
					setVisBliBeslutterLaster(false);
					setHarBeslutter(true);
					setVisSendEndringer(true);
				})
				.catch(() => {
					setVisBliBeslutterLaster(false);
					showModal(ModalType.FEIL_VED_BLI_BESLUTTER);
				});

	}

	function handleSendEndringer() {
		setVisSendEndringerLaster(true);

		sendDataTilBackend().then(() => {
			setVisSendEndringerLaster(false);
			changeView(ViewType.UTKAST);
			setVisSendEndringer(false);
		});

	}

	function handleGodkjenne() {
		setVisGodkjennesLaster(true);

			fetchWithInfo(lagGodkjennVedtak({fnr}))
				.then(() => {
					setVisGodkjennesLaster(false);
					setGodkjentAvBeslutter(true);
				})
				.catch(() => {
					setVisGodkjennesLaster(false);
					showModal(ModalType.FEIL_VED_BLI_BESLUTTER);
				});
	}

	return (
		<div className="aksjoner">
			<Tilbakeknapp
				htmlType="button"
				onClick={isReadOnly ? handleTilbake : handleLagreOgTilbake}
			/>
			<div className="aksjoner__knapper">
				<Show if={visKlarTilBeslutter}>
					<Knapp
						spinner={visKlarTilBeslutterLaster}
						disabled={visKlarTilBeslutterLaster}
						mini={true}
						htmlType="button"
						onClick={handleKlarTilBeslutter}
					>
						KLAR TIL BESLUTTER
					</Knapp>
				</Show>
				<Show if={visBliBeslutter}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleBliBeslutter}
					>
						BLI BESLUTTER
					</Hovedknapp>
				</Show>
				<Show if={visSendEndringer}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleSendEndringer}
					>
						SEND ENDRINGER
					</Hovedknapp>
				</Show>
				<Hovedknapp
					spinner={visForhandsvisngLaster}
					disabled={visForhandsvisngLaster}
					mini={true}
					htmlType="submit"
					onClick={isReadOnly ? handleForhandsvis : handleForhandsvisOgLagre}
				>
					FORHÅNDSVIS
				</Hovedknapp>
				<Show if={visGodkjenne}>
					<Flatknapp
						mini={true}
						htmlType="button"
						onClick={handleGodkjenne}
					>
						GODKJENNE
					</Flatknapp>
				</Show>
				<Show if={godkjentAvBeslutter}>
					<div className="aksjoner__godkjent-tekst">
						<Normaltekst>Godkjent</Normaltekst>
					</div>
				</Show>
			</div>
			<Show if={!isReadOnly}>
				<Flatknapp
					className="aksjoner__ikon-knapp"
					mini={true}
					htmlType="button"
					onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
				>
					<SlettIkon className="aksjoner__ikon" />
					Slett
				</Flatknapp>
			</Show>
			<Show if={isReadOnly}>
				<Flatknapp
					className="aksjoner__ikon-knapp"
					mini={true}
					htmlType="button"
					onClick={() => showModal(ModalType.BEKREFT_TA_OVER_UTKAST)}
				>
					<TaOverIkon className="aksjoner__ikon"/>
					TA OVER
				</Flatknapp>
			</Show>
		</div>
	);
}

export default UtkastAksjoner;
