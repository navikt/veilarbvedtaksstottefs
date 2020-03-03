import React from 'react';
import { InnsatsgruppeType, Vedtak } from '../../../rest/data/vedtak';
import { Dato } from '../dato';
import { Knapp } from 'nav-frontend-knapper';
import { Veileder } from '../veileder';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { frontendlogger } from '../../../utils/frontend-logger';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';
import fullfortVedtakIcon from './fullfort.svg';
import './gjeldende-vedtak-panel.less';

export function GjeldendeVedtakPanel(props: { gjeldendeVedtak: Vedtak }) {
	const { changeView } = useViewStore();
	const {
		id, innsatsgruppe,
		veilederNavn, oppfolgingsenhetId,
		oppfolgingsenhetNavn, sistOppdatert
	} = props.gjeldendeVedtak;

	const innsatsgruppeData = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);

	const handleVisVedtakClicked = () => {
		changeView(ViewType.VEDTAK, { vedtakId: id });
		frontendlogger.logMetrikk('vis-gjeldende-vedtak');
	};

	return (
		<VedtaksstottePanel
			tittel="Gjeldende oppfølgingsvedtak"
			undertittel={innsatsgruppeData.tittel}
			imgSrc={fullfortVedtakIcon}
			panelKlasse="gjeldende-vedtak-panel"
			undertittelClassName="gjeldende-vedtak-panel__undertittel"
			tekstKomponent={
				<>
					<p className="typo-undertekst gjeldende-vedtak-panel__innsatsgruppe">{innsatsgruppeData.undertekst}</p>
					<Dato className="gjeldende-vedtak-panel__dato" sistOppdatert={sistOppdatert} formatType="short" text="Dato" />
					<Veileder
						text="Fattet av"
						veilederNavn={veilederNavn}
						enhetId={oppfolgingsenhetId}
						enhetNavn={oppfolgingsenhetNavn}
					/>
				</>
			}
			knappKomponent={<Knapp onClick={handleVisVedtakClicked}>Vis vedtak</Knapp>}
		/>
	);
}
