import { useMemo } from 'react';
import { Element } from 'nav-frontend-typografi';
import { useViewStore, ViewType } from '../../store/view-store';
import { sortDatesDesc } from '../../util/date-utils';
import { OnVedtakClicked, VedtakPanel } from '../vedtak-panel/vedtak-panel';
import vedtakBilde from './pdf.svg';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import './vedtak-fra-arena-liste.less';
import { logMetrikk } from '../../util/logger';
import { ArenaVedtak } from '../../api/veilarbvedtaksstotte/vedtak';

function mapArenaVedtakTilPanel(vedtak: ArenaVedtak, onClick: OnVedtakClicked<ArenaVedtak>, posisjon: number) {
	return (
		<VedtakPanel<ArenaVedtak>
			name="arena-vedtak"
			onClick={onClick}
			vedtak={vedtak}
			dato={vedtak.dato}
			posisjon={posisjon}
			ikon={vedtakBilde}
		>
			<Element className="arena-vedtak-panel__tittel">Vedtaksbrev - 14a</Element>
		</VedtakPanel>
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
			className="arena-vedtak-panel"
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: ArenaVedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapArenaVedtakTilPanel(vedtak, onClick, posisjon);
			}}
		/>
	);
}
