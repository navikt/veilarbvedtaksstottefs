import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { VedtakData } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import nyttVedtakBilde from './nytt-vedtak.svg';
import { frontendlogger } from '../../../utils/frontend-logger';
import { useFetchStore } from '../../../stores/fetch-store';
import { fetchWithInfo } from '../../../rest/utils';
import { lagNyttVedtakUtkastFetchInfo } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import './nytt-vedtak-panel.less';

export function NyttVedtakPanel(props: { utkast: OrNothing<VedtakData> }) {
	const { fnr } = useAppStore();
	const { showModal, hideModal } = useModalStore();
	const { underOppfolging, vedtak } = useFetchStore();
	const { changeView } = useViewStore();
	const { utkast } = props;

	function lagNyttVedtakUtkastOgRedirectTilUtkast() {
		showModal(ModalType.LASTER);
		fetchWithInfo(lagNyttVedtakUtkastFetchInfo({ fnr }))
			.then(() => {
				vedtak.fetch({ fnr }, () => {
					hideModal();
					changeView(ViewType.UTKAST);
					frontendlogger.logMetrikk('lag-nytt-vedtak');
				});
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_OPPRETTING_AV_UTKAST);
			});
	}

	if (utkast || !underOppfolging.data.underOppfolging) {
		return null;
	}

	return (
		<button className="nytt-vedtak-panel__btn-wrapper" onClick={lagNyttVedtakUtkastOgRedirectTilUtkast}>
			<HovedsidePanel className="nytt-vedtak-panel">
				<img src={nyttVedtakBilde} alt="" className="nytt-vedtak-panel__bilde"/>
				<Undertittel tag="h1" className="nytt-vedtak-panel__tittel">Lag nytt vedtak</Undertittel>
				<Normaltekst>Opprett nytt oppfølgingsvedtak for denne brukeren</Normaltekst>
			</HovedsidePanel>
		</button>
	);
}
