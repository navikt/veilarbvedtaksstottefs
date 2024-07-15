import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../store/view-store';
import { getInnsatsgruppeTekst } from '../../../util/innsatsgruppe';
import fullfortVedtakIcon from './fullfort.svg';
import { logMetrikk } from '../../../util/logger';
import { Vedtak } from '../../../api/veilarbvedtaksstotte';
import { formatDateStr } from '../../../util/date-utils';
import { Button, Detail } from '@navikt/ds-react';
import './gjeldende-vedtak-panel.css';

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
					<Detail>
						<b>Dato:</b> {formatDateStr(vedtakFattet)}
					</Detail>
					<Detail>
						<b>Fattet av:</b> {veilederNavn}
					</Detail>
				</>
			}
			knappKomponent={
				<Button size="small" variant="secondary" onClick={handleVisVedtakClicked}>
					Vis vedtak
				</Button>
			}
		/>
	);
}
