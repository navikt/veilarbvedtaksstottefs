import { Button, Detail } from '@navikt/ds-react';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../store/view-store';
import { innsatsgruppeTekst } from '../../../util/innsatsgruppe';
import { hovedmalTekst } from '../../../util/hovedmal';
import fullfortVedtakIcon from './fullfort.svg';
import { logMetrikk } from '../../../util/logger';
import { Vedtak } from '../../../api/veilarbvedtaksstotte';
import { formatDateStr } from '../../../util/date-utils';
import './gjeldende-vedtak-panel.css';

export function GjeldendeVedtakPanel(props: { gjeldendeVedtak: Vedtak }) {
	const { changeView } = useViewStore();
	const { id, innsatsgruppe, hovedmal, veilederNavn, vedtakFattet } = props.gjeldendeVedtak;

	const handleVisVedtakClicked = () => {
		changeView(ViewType.VEDTAK, { vedtakId: id });
		logMetrikk('vis-gjeldende-vedtak');
	};

	return (
		<VedtaksstottePanel
			tittel="Gjeldende oppfølgingsvedtak"
			undertittel={innsatsgruppeTekst[innsatsgruppe]}
			detaljer={hovedmal ? hovedmalTekst[hovedmal] : undefined}
			panelKlasse="gjeldende-vedtak-panel"
			imgSrc={fullfortVedtakIcon}
			tekstKomponent={
				<>
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
