import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Vedtak } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import nyttVedtakBilde from './nytt-vedtak.svg';
import { frontendlogger } from '../../../utils/frontend-logger';
import { fetchLagNyttUtkast, fetchUtkast } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import { useDataStore } from '../../../stores/data-store';
import './nytt-vedtak-panel.less';

export function NyttVedtakPanel(props: { utkast: OrNothing<Vedtak> }) {
	const { fnr } = useAppStore();
	const { showModal, hideModal } = useModalStore();
	const { oppfolgingData, setMeldinger, setUtkast } = useDataStore();
	const { changeView } = useViewStore();
	const { utkast } = props;

	function lagNyttVedtakUtkastOgRedirectTilUtkast() {
		showModal(ModalType.LASTER);
		fetchLagNyttUtkast(fnr)
			.then(() => fetchUtkast(fnr))
			.then(fetchResponse => {
				if (!fetchResponse.data) {
					throw Error('Fant ikke utkast');
				}
				setUtkast(fetchResponse.data);
				setMeldinger([]); // Rydd opp hvis det ligger gamle meldinger mellomlagret
				hideModal();
				changeView(ViewType.UTKAST);
				frontendlogger.logMetrikk('lag-nytt-vedtak');
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_OPPRETTING_AV_UTKAST);
			});
	}

	if (utkast || !oppfolgingData.underOppfolging) {
		return null;
	}

	return (
		<button className="nytt-vedtak-panel__btn-wrapper" onClick={lagNyttVedtakUtkastOgRedirectTilUtkast}>
			<HovedsidePanel className="nytt-vedtak-panel">
				<img src={nyttVedtakBilde} alt="" className="nytt-vedtak-panel__bilde"/>
				<Undertittel tag="h1" className="nytt-vedtak-panel__tittel">Lag nytt vedtak</Undertittel>
				<Normaltekst>Opprett nytt oppfølgingsvedtak for denne brukeren.</Normaltekst>
			</HovedsidePanel>
		</button>
	);
}
