import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import dialogIkon from './dialog.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { fetchWithInfo } from '../../../rest/utils';
import { ReactComponent as SlettIkon } from './delete.svg';
import {
	lagOppdaterBeslutterProsessStatusFetchInfo,
	lagOppdaterVedtakUtkastFetchInfo, lagStartBeslutterProsessFetchInfo
} from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, SkjemaData, trengerBeslutter } from '../../../components/utkast-skjema/skjema-utils';
import Show from '../../../components/show';
import { Normaltekst } from 'nav-frontend-typografi';
import {
	erBeslutterProsessStartet,
	erKlarTilVeileder, finnGjeldendeVedtak, isNothing,
	mapSkjemaLagringStatusTilTekst
} from '../../../utils';
import { useDataStore } from '../../../stores/data-store';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { BeslutterProsessStatus, Vedtak } from '../../../rest/data/vedtak';
import './aksjoner.less';
import ImageButton from '../../../components/image-button/image-button';
import { DialogModal } from '../../../components/dialog-modal/dialog-modal';
import { SystemMeldingType } from '../../../utils/types/melding-type';
import { erAnsvarligVeileder } from '../../../utils/tilgang';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function EndreUtkastAksjoner(props: UtkastAksjonerProps) {
	const {
		malform, fattedeVedtak,
		setBeslutterProsessStatus,
		utkast, leggTilSystemMelding
	} = useDataStore();
	const {changeView} = useViewStore();
	const {showModal} = useModalStore();
	const {validerSkjema, lagringStatus, innsatsgruppe} = useSkjemaStore();

	const {
		id: utkastId,
		beslutterProsessStatus,
		beslutterNavn
	} = utkast as Vedtak;

	const [dialogModalApen, setDialogModalApen] = useState(beslutterProsessStatus != null);
	const [laster, setLaster] = useState(false);

	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);
	const visStartBeslutterProsess = trengerBeslutter(innsatsgruppe) && erAnsvarligVeileder && isNothing(beslutterNavn) && !erBeslutterProsessStartet(beslutterProsessStatus);
	const visKlarTilBeslutter = erKlarTilVeileder(beslutterProsessStatus);
	const erForhandsvisHovedknapp = !visKlarTilBeslutter;

	function sendDataTilBackend() {
		// Vi oppdaterer ikke lagringStatus her fordi det blir rart at dette trigges på en "urelatert" handling
		const params = {vedtakId: utkastId, skjema: props.vedtakskjema, malform: hentMalformFraData(malform)};
		return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo(params))
			.catch(() => {
				setLaster(false);
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}

	function fokuserPaDialogSidebarTab() {
		setDialogModalApen(true);
	}

	function handleOnForhandsvisClicked() {
		const skjemaFeil = validerSkjema(gjeldendeVedtak);

		if (harFeil(skjemaFeil)) {
			scrollTilForsteFeil(skjemaFeil);
			props.harForsoktForhandsvisning();
			return;
		}

		setLaster(true);
		sendDataTilBackend()
			.then(() => changeView(ViewType.FORHANDSVISNING));
	}

	function handleOnStartBeslutterProsessClicked() {
		setLaster(true);
		sendDataTilBackend()
			.then(() => {
				fetchWithInfo(lagStartBeslutterProsessFetchInfo({vedtakId: utkastId}))
					.then(() => {
						fokuserPaDialogSidebarTab();
						setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_BESLUTTER);
						leggTilSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);
					})
					.catch(() => showModal(ModalType.FEIL_VED_START_BESLUTTER_PROSESS))
					.finally(() => setLaster(false));
			});
	}

	function handleOnTilbakeClicked() {
		setLaster(true);
		sendDataTilBackend()
			.then(() => changeView(ViewType.HOVEDSIDE));
	}

	function handleOnKlarTilClicked() {
		setLaster(true);

		fetchWithInfo(lagOppdaterBeslutterProsessStatusFetchInfo({vedtakId: utkastId}))
			.then(() => {
				setBeslutterProsessStatus(BeslutterProsessStatus.KLAR_TIL_BESLUTTER);
			})
			.catch(() => showModal(ModalType.FEIL_VED_OPPDATER_BESLUTTER_PROSESS_STATUS))
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
				<Show if={visKlarTilBeslutter}>
					<Hovedknapp
						mini={true}
						htmlType="button"
						onClick={handleOnKlarTilClicked}
						disabled={laster}
					>
						Klar til beslutter
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
				<Flatknapp
					mini={true}
					htmlType="button"
					onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
					disabled={laster}
				>
					<SlettIkon className="aksjoner__ikon"/>
					Slett
				</Flatknapp>

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

export default EndreUtkastAksjoner;
