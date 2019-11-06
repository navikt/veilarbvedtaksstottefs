import React from 'react';
import { VedtakData } from '../../../rest/data/vedtak';
import { Dato } from '../dato';
import { Knapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../../utils/types/ornothing';
import { getInnsatsgruppeNavn } from '../../skjema/innsatsgruppe/innsatsgruppe';
import { Veileder } from '../veileder';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import fullfortVedtakIcon from './fullfort.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import ingenVedtakBilde from './ingen-vedtak.svg';
import { frontendlogger } from '../../../utils/frontend-logger';
import { useFetchStore } from '../../../stores/fetch-store';
import { useViewStore, ViewType } from '../../../stores/view-store';
import './gjeldende-vedtak-panel.less';

export function GjeldendeVedtakPanel(props: { gjeldendeVedtak: OrNothing<VedtakData> }) {
	const { underOppfolging } = useFetchStore();
	const { changeView } = useViewStore();

	if (!underOppfolging.data.underOppfolging) {
		return (
			<VedtaksstottePanel
				tittel="Gjeldende oppfølgingsvedtak"
				undertittel="Ingen gjeldende oppfølgingsvedtak"
				imgSrc={ingenVedtakBilde}
				panelKlasse="ikke-under-oppfolging-panel"
				tekstKomponent={<Normaltekst>Denne brukeren er ikke under oppfølging.</Normaltekst>}
			/>
		);
	} else if (!props.gjeldendeVedtak) {
		return null;
	}

	const {
		id,
		innsatsgruppe,
		sistOppdatert,
		veilederNavn,
		veilederEnhetId,
		veilederIdent,
		veilederEnhetNavn
	} = props.gjeldendeVedtak;
	const innsatsgruppeNavn = getInnsatsgruppeNavn(innsatsgruppe);

	const handleVisVedtakClicked = () => {
		changeView(ViewType.VEDTAK, { vedtakId: id });
		frontendlogger.logMetrikk('vis-gjeldende-vedtak');
	};

	return (
		<VedtaksstottePanel
			tittel="Gjeldende oppfølgingsvedtak"
			undertittel={innsatsgruppeNavn ? innsatsgruppeNavn : ''}
			imgSrc={fullfortVedtakIcon}
			panelKlasse="gjeldende-vedtak-panel"
			tekstKomponent={
				<>
					<Dato sistOppdatert={sistOppdatert} formatType="short" text="Dato" />
					<Veileder
						text="Fattet av"
						veilederNavn={veilederNavn || veilederIdent}
						enhetId={veilederEnhetId}
						enhetNavn={veilederEnhetNavn}
					/>
				</>
			}
			knappKomponent={<Knapp onClick={handleVisVedtakClicked}>Vis vedtak</Knapp>}
		/>
	);
}
