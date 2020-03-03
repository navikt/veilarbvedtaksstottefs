import React, { useMemo } from 'react';
import { ArenaVedtak } from '../../rest/data/vedtak';
import { Element } from 'nav-frontend-typografi';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import { sortDates } from '../../utils/date-utils';
import { OnVedtakClicked, VedtakPanel } from '../vedtak-panel/vedtak-panel';
import vedtakBilde from './pdf.svg';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import './vedtak-fra-arena.less';

function mapArenaVedtakTilPanel(vedtak: ArenaVedtak, onClick: OnVedtakClicked<ArenaVedtak>, posisjon: number) {
	return (
		<VedtakPanel<ArenaVedtak>
			onClick={onClick}
			vedtak={vedtak}
			dato={vedtak.dato}
			posisjon={posisjon}
			ikon={vedtakBilde}
		>
			<Element className="arena-vedtak-panel__tittel">Oppfølgingsvedtak fra Arena</Element>
		</VedtakPanel>
	);
}

export function VedtakFraArena({ arenaHistorikk }: { arenaHistorikk: ArenaVedtak[] }) {
	const { changeView } = useViewStore();

	const arenaVedtak = useMemo(() => {
		return [...arenaHistorikk].sort((v1, v2) => sortDates(v1.dato, v2.dato));
	}, [arenaHistorikk]);

	function handleTidligereVedtakClicked(vedtakData: ArenaVedtak, idx: number) {
		changeView(ViewType.VEDTAK_PDF, {
			journalpostId: vedtakData.journalpostId,
			dokumentInfoId: vedtakData.dokumentInfoId
		});
		frontendlogger.logMetrikk('vis-arena-vedtak', { index: idx });
	}

	return (
		<VedtakListe<ArenaVedtak>
			tittel="Utsendte vedtak fra Arena"
			vedtak={arenaVedtak}
			className="arena-vedtak-panel"
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: ArenaVedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapArenaVedtakTilPanel(vedtak, onClick, posisjon)
			}}
		/>
	);
}

