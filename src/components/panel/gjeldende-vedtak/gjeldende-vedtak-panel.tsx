import React from 'react';
import { InnsatsgruppeType, VedtakData } from '../../../rest/data/vedtak';
import { Dato } from '../dato';
import { Knapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../../utils/types/ornothing';
import { Veileder } from '../veileder';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import fullfortVedtakIcon from './fullfort.svg';
import { frontendlogger } from '../../../utils/frontend-logger';
import { useViewStore, ViewType } from '../../../stores/view-store';
import './gjeldende-vedtak-panel.less';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';

export function GjeldendeVedtakPanel(props: { gjeldendeVedtak: OrNothing<VedtakData> }) {
	const { changeView } = useViewStore();

	if (!props.gjeldendeVedtak) {
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
