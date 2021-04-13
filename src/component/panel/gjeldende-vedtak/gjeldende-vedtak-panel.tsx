import React from 'react';
import { DatoLabel } from '../dato-label';
import { Knapp } from 'nav-frontend-knapper';
import { Veileder } from '../veileder';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../store/view-store';
import { getInnsatsgruppeTekst } from '../../../util/innsatsgruppe';
import fullfortVedtakIcon from './fullfort.svg';
import './gjeldende-vedtak-panel.less';
import { logMetrikk } from '../../../util/logger';
import { Vedtak } from '../../../api/veilarbvedtaksstotte';

export function GjeldendeVedtakPanel(props: { gjeldendeVedtak: Vedtak }) {
	const { changeView } = useViewStore();
	const { id, innsatsgruppe, veilederNavn, vedtakFattet } = props.gjeldendeVedtak;
	const innsatsgruppeData = getInnsatsgruppeTekst(innsatsgruppe);

	const handleVisVedtakClicked = () => {
		changeView(ViewType.VEDTAK, { vedtakId: id });
		logMetrikk('vis-gjeldende-vedtak');
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
					<p className="typo-undertekst gjeldende-vedtak-panel__innsatsgruppe">
						{innsatsgruppeData.undertekst}
					</p>
					<DatoLabel
						className="gjeldende-vedtak-panel__dato"
						sistOppdatert={vedtakFattet}
						formatType="short"
						text="Dato"
					/>
					<Veileder text="Fattet av" veilederNavn={veilederNavn} />
				</>
			}
			knappKomponent={<Knapp onClick={handleVisVedtakClicked}>Vis vedtak</Knapp>}
		/>
	);
}
