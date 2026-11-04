import { Button, Detail } from '@navikt/ds-react';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { innsatsgruppeTekst } from '../../../util/innsatsgruppe';
import { hovedmalTekst } from '../../../util/hovedmal';
import { FileCheckmarkIcon } from '@navikt/aksel-icons';
import { logMetrikk } from '../../../util/logger';
import { Vedtak } from '../../../api/veilarbvedtaksstotte';
import { formatDateStr } from '../../../util/date-utils';
import './gjeldende-vedtak-panel.css';
import '../../vedtak-ikon.css';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes.ts';

export function GjeldendeVedtakPanel(props: { gjeldendeVedtak: Vedtak }) {
	const navigate = useNavigate();
	const { id, innsatsgruppe, hovedmal, veilederNavn, vedtakFattet } = props.gjeldendeVedtak;

	const handleVisVedtakClicked = () => {
		navigate(routes.vedtak(id));
		logMetrikk('vis-gjeldende-vedtak');
	};

	return (
		<VedtaksstottePanel
			tittel="Gjeldende oppfølgingsvedtak"
			undertittel={innsatsgruppeTekst[innsatsgruppe]}
			detaljer={hovedmal ? hovedmalTekst[hovedmal] : undefined}
			className="gjeldende-vedtak-panel"
			ikon={FileCheckmarkIcon}
			ikonClassName="vedtak-ikon--success"
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
