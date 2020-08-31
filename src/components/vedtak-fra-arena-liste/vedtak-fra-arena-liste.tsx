import React, { useMemo } from 'react';
import { ArenaVedtak } from '../../rest/data/vedtak';
import { Element } from 'nav-frontend-typografi';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import { sortDatesDesc } from '../../utils/date-utils';
import { OnVedtakClicked, VedtakPanel } from '../vedtak-panel/vedtak-panel';
import vedtakBilde from './pdf.svg';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import './vedtak-fra-arena-liste.less';

function mapArenaVedtakTilPanel(vedtak: ArenaVedtak, onClick: OnVedtakClicked<ArenaVedtak>, posisjon: number) {
	return (
		<VedtakPanel<ArenaVedtak>
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
		frontendlogger.logMetrikk('vis-arena-vedtak', { index: idx });
	}

	return (
		<VedtakListe<ArenaVedtak>
			tittel="Utsendte oppfølgingsvedtak fra Arena"
			ingenVedtakTekst="Ingen utsendte oppfølgingsvedtak"
			vedtak={arenaVedtak}
			className="arena-vedtak-panel"
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: ArenaVedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapArenaVedtakTilPanel(vedtak, onClick, posisjon)
			}}
		/>
	);
}

