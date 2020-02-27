import React from 'react';
import { ArenaVedtak, erVedtakFraArena, Vedtak, ModiaVedtak } from '../../rest/data/vedtak';
import { Undertittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import {
	TidligereArenaVedtakLenkePanel,
	TidligereVedtakLenkePanel
} from './tidligere-vedtak-panel/tidligere-vedtak-panel';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import './tidligere-vedtak.less';

export type OnTidligereVedtakClicked = (vedtakData: Vedtak, idx: number) => void;

function mapTidligereVedtakTilListItem(vedtakData: Vedtak, idx: number, handleOnVedtakClicked: OnTidligereVedtakClicked) {
	return (
		<li className="tidligere-vedtak__liste-item" key={idx}>
			{ erVedtakFraArena(vedtakData) ?
				(
					<TidligereArenaVedtakLenkePanel
						onClick={handleOnVedtakClicked}
						tidligereVedtak={vedtakData}
						posisjon={idx}
					/>
				)
				:
				(
					<TidligereVedtakLenkePanel
						onClick={handleOnVedtakClicked}
						tidligereVedtak={vedtakData}
						posisjon={idx}
					/>
				)
			}
		</li>
	);
}

function getDate(vedtakData: Vedtak): string {
	if (erVedtakFraArena(vedtakData)) {
		return vedtakData.datoOpprettet;
	}

	return (vedtakData as ModiaVedtak).sistOppdatert;
}

function sorterTidligereVedtak(tidligereVedtak: Vedtak[]) {
	tidligereVedtak.sort((vedtak1, vedtak2) => {
		const d1 = dayjs(getDate(vedtak1));
		const d2 = dayjs(getDate(vedtak2));
		return d1.isBefore(d2) ? 1 : -1;
	});
}

export function TidligereVedtak({ modiaHistorikk, arenaHistorikk }: { modiaHistorikk: ModiaVedtak[], arenaHistorikk: ArenaVedtak[] }) {
	const { changeView } = useViewStore();

	const tidligereVedtak: Vedtak[] = [...modiaHistorikk, ...arenaHistorikk];
	sorterTidligereVedtak(tidligereVedtak);

	function handleTidligereVedtakClicked(vedtakData: Vedtak, idx: number) {
		if (erVedtakFraArena(vedtakData)) {
			changeView(ViewType.VEDTAK_PDF, {
				journalpostId: vedtakData.journalpostId,
				dokumentInfoId: vedtakData.dokumentInfoId
			});
		} else {
			changeView(ViewType.VEDTAK, { vedtakId: (vedtakData as ModiaVedtak).id });
		}

		frontendlogger.logMetrikk('vis-tidligere-vedtak', { index: idx });
	}

	return (
        <div className="tidligere-vedtak">
	        <Undertittel className="tidligere-vedtak__tittel" tag="h1">Tidligere oppfølgingsvedtak</Undertittel>
	        <ul className="tidligere-vedtak__liste">
		        {tidligereVedtak.map((vedtak, idx) => mapTidligereVedtakTilListItem(vedtak, idx, handleTidligereVedtakClicked))}
	        </ul>
        </div>
	);
}

