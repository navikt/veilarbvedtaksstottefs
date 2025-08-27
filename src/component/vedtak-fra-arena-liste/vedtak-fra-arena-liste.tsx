import { useMemo } from 'react';
import { useViewStore, ViewType } from '../../store/view-store';
import { sortDatesDesc } from '../../util/date-utils';
import { OnVedtakClicked, VedtaklistePanel } from '../vedtakliste-panel/vedtakliste-panel';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import { ArenaVedtak } from '../../api/veilarbvedtaksstotte/vedtak';
import vedtakBilde from './pdf.svg';
import { logMetrikk } from '../../util/logger';
import { BodyShort } from '@navikt/ds-react';

function mapArenaVedtakTilPanel(vedtak: ArenaVedtak, onClick: OnVedtakClicked<ArenaVedtak>, posisjon: number) {
	return (
		<VedtaklistePanel<ArenaVedtak>
			name="arena-vedtak"
			onClick={onClick}
			vedtak={vedtak}
			dato={vedtak.dato}
			posisjon={posisjon}
			ikon={vedtakBilde}
		>
			<BodyShort size="small" weight="semibold">
				Vedtaksbrev - § 14 a
			</BodyShort>
		</VedtaklistePanel>
	);
}

export function VedtakFraArenaListe({ vedtakListe }: { vedtakListe: ArenaVedtak[] }) {
	const { changeView } = useViewStore();

	const arenaVedtak = useMemo(() => {
		return [...vedtakListe].sort((v1, v2) => sortDatesDesc(v1.dato, v2.dato));
	}, [vedtakListe]);

	function handleTidligereVedtakClicked(vedtakData: ArenaVedtak, idx: number) {
		changeView(ViewType.ARENA_VEDTAK_PDF, {
			journalpostId: vedtakData.journalpostId,
			dokumentInfoId: vedtakData.dokumentInfoId
		});
		logMetrikk('vis-arena-vedtak', { index: idx });
	}

	return (
		<VedtakListe<ArenaVedtak>
			tittel="Utsendte oppfølgingsvedtak fra Arena"
			ingenVedtakTekst="Ingen utsendte oppfølgingsvedtak"
			vedtak={arenaVedtak}
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: ArenaVedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapArenaVedtakTilPanel(vedtak, onClick, posisjon);
			}}
		/>
	);
}
