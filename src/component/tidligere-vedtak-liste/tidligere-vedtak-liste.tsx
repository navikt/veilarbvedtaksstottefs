import { useMemo } from 'react';
import { BodyShort, Detail } from '@navikt/ds-react';
import { useViewStore, ViewType } from '../../store/view-store';
import { sortDatesDesc } from '../../util/date-utils';
import { OnVedtakClicked, VedtaklistePanel } from '../vedtakliste-panel/vedtakliste-panel';
import { innsatsgruppeTekst } from '../../util/innsatsgruppe';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { logMetrikk } from '../../util/logger';
import vedtakBilde from './vedtak.svg';
import { getHovedmalNavn } from '../../util/hovedmal';
import './tidligere-vedtak-liste.css';

function mapVedtakTilPanel(vedtak: Vedtak, onClick: OnVedtakClicked<Vedtak>, posisjon: number) {
	const hovedmalTekst = getHovedmalNavn(vedtak.hovedmal);

	return (
		<VedtaklistePanel<Vedtak>
			name="tidligere-vedtak"
			onClick={onClick}
			vedtak={vedtak}
			dato={vedtak.vedtakFattet}
			posisjon={posisjon}
			ikon={vedtakBilde}
		>
			<BodyShort size="small" weight="semibold" className="tidligere-vedtak-panel__innsats--tittel">
				{innsatsgruppeTekst[vedtak.innsatsgruppe]}
			</BodyShort>
			{vedtak.hovedmal && <Detail textColor="subtle">{hovedmalTekst}</Detail>}
		</VedtaklistePanel>
	);
}

export function TidligereVedtakListe({ vedtakListe }: { vedtakListe: Vedtak[] }) {
	const { changeView } = useViewStore();

	const tidligereVedtak = useMemo(() => {
		return [...vedtakListe].sort((v1, v2) => sortDatesDesc(v1.vedtakFattet, v2.vedtakFattet));
	}, [vedtakListe]);

	function handleTidligereVedtakClicked(vedtakData: Vedtak, idx: number) {
		changeView(ViewType.VEDTAK, { vedtakId: (vedtakData as Vedtak).id });
		logMetrikk('vis-tidligere-vedtak', { index: idx });
	}

	return (
		<VedtakListe<Vedtak>
			tittel="Tidligere oppfølgingsvedtak i Modia"
			ingenVedtakTekst="Ingen tidligere oppfølgingsvedtak"
			vedtak={tidligereVedtak}
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: Vedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapVedtakTilPanel(vedtak, onClick, posisjon);
			}}
		/>
	);
}
