import React from 'react';
import { erVedtakFraArena, InnsatsgruppeType, Vedtak, ModiaVedtak } from '../../../rest/data/vedtak';
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
	const gjeldendeVedtak = props.gjeldendeVedtak;

	let panelTittel: string;
	let knappTekst: string;
	let dato: string;
	let viewType: ViewType;
	let viewProps: {};

	if (erVedtakFraArena(gjeldendeVedtak)) {
		panelTittel = 'Gjeldende oppfølgingsvedtak fra Arena';
		knappTekst = 'Vis vedtaksbrev';
		dato = gjeldendeVedtak.datoOpprettet;
		viewType = ViewType.VEDTAK_PDF;
		viewProps = {
			journalpostId: gjeldendeVedtak.journalpostId,
			dokumentInfoId: gjeldendeVedtak.dokumentInfoId
		};
	} else {
		const vedtak = gjeldendeVedtak as ModiaVedtak;
		panelTittel = 'Gjeldende oppfølgingsvedtak';
		knappTekst = 'Vis vedtak';
		dato = vedtak.sistOppdatert;
		viewType = ViewType.VEDTAK;
		viewProps = { vedtakId: vedtak.id };
	}

	const {
		innsatsgruppe,
		veilederNavn,
		oppfolgingsenhetId,
		oppfolgingsenhetNavn
	} = gjeldendeVedtak;

	const innsatsgruppeData = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);

	const handleVisVedtakClicked = () => {
		changeView(viewType, viewProps);
		frontendlogger.logMetrikk('vis-gjeldende-vedtak');
	};

	return (
		<VedtaksstottePanel
			tittel={panelTittel}
			undertittel={innsatsgruppeData.tittel}
			imgSrc={fullfortVedtakIcon}
			panelKlasse="gjeldende-vedtak-panel"
			undertittelClassName="gjeldende-vedtak-panel__undertittel"
			tekstKomponent={
				<>
					<p className="typo-undertekst gjeldende-vedtak-panel__innsatsgruppe">{innsatsgruppeData.undertekst}</p>
					<Dato className="gjeldende-vedtak-panel__dato" sistOppdatert={dato} formatType="short" text="Dato" />
					<Veileder
						text="Fattet av"
						veilederNavn={veilederNavn}
						enhetId={oppfolgingsenhetId}
						enhetNavn={oppfolgingsenhetNavn}
					/>
				</>
			}
			knappKomponent={<Knapp onClick={handleVisVedtakClicked}>{knappTekst}</Knapp>}
		/>
	);
}
