import React, { useMemo } from 'react';
import { ArenaVedtak } from '../../rest/data/vedtak';
import { Undertittel } from 'nav-frontend-typografi';
import { TidligereArenaVedtakLenkePanel, } from './tidligere-vedtak-panel/tidligere-vedtak-panel';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import { sortDates } from '../../utils/date-utils';
import './tidligere-vedtak-arena.less';

export type OnTidligereVedtakClicked = (vedtak: ArenaVedtak, idx: number) => void;

export function TidligereVedtakArena({ arenaHistorikk }: { arenaHistorikk: ArenaVedtak[] }) {
	const { changeView } = useViewStore();

	const tidligereArenaVedtak = useMemo(() => {
		return [...arenaHistorikk].sort((v1, v2) => sortDates(v1.dato, v2.dato));
	}, [arenaHistorikk]);

	function handleTidligereVedtakClicked(vedtakData: ArenaVedtak, idx: number) {
		changeView(ViewType.VEDTAK_PDF, {
			journalpostId: vedtakData.journalpostId,
			dokumentInfoId: vedtakData.dokumentInfoId
		});
		frontendlogger.logMetrikk('vis-tidligere-vedtak', { index: idx });
	}

	return (
        <div className="tidligere-vedtak">
	        <Undertittel className="tidligere-vedtak__tittel" tag="h1">Utsendte vedtak fra Arena</Undertittel>
	        <ul className="tidligere-vedtak__liste">
		        {tidligereArenaVedtak.map((vedtak, idx) => (
			        <li className="tidligere-vedtak__liste-item" key={idx}>
				        <TidligereArenaVedtakLenkePanel
					        onClick={handleTidligereVedtakClicked}
					        tidligereVedtak={vedtak}
					        posisjon={idx}
				        />
			        </li>
		        ))}
	        </ul>
        </div>
	);
}

