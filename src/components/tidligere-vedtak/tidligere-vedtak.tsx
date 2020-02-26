import React from 'react';
import { ArenaVedtakData, erVedtakFraArena, TidligereVedtakData, VedtakData } from '../../rest/data/vedtak';
import { Undertittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import {
	TidligereArenaVedtakLenkePanel,
	TidligereVedtakLenkePanel
} from './tidligere-vedtak-panel/tidligere-vedtak-panel';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import './tidligere-vedtak.less';

export type OnTidligereVedtakClicked = (vedtakData: TidligereVedtakData, idx: number) => void;

function mapTidligereVedtakTilListItem(vedtakData: TidligereVedtakData, idx: number, handleOnVedtakClicked: OnTidligereVedtakClicked) {
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

function getDate(vedtakData: TidligereVedtakData): string {
	if (erVedtakFraArena(vedtakData)) {
		return vedtakData.datoOpprettet;
	}

	return (vedtakData as VedtakData).sistOppdatert;
}

function sorterTidligereVedtak(tidligereVedtak: TidligereVedtakData[]) {
	tidligereVedtak.sort((vedtak1, vedtak2) => {
		const d1 = dayjs(getDate(vedtak1));
		const d2 = dayjs(getDate(vedtak2));
		return d1.isBefore(d2) ? 1 : -1;
	});
}

export function TidligereVedtak({ vedtakHistorikk, vedtakFraArenaHistorikk }: { vedtakHistorikk: VedtakData[], vedtakFraArenaHistorikk: ArenaVedtakData[] }) {
	const { changeView } = useViewStore();

	const tidligereVedtak: TidligereVedtakData[] = [...vedtakHistorikk, ...vedtakFraArenaHistorikk];
	sorterTidligereVedtak(tidligereVedtak);

	function handleTidligereVedtakClicked(vedtakData: TidligereVedtakData, idx: number) {
		if (erVedtakFraArena(vedtakData)) {
			changeView(ViewType.VEDTAK_PDF, {
				journalpostId: vedtakData.journalpostId,
				dokumentInfoId: vedtakData.dokumentInfoId
			});
		} else {
			changeView(ViewType.VEDTAK, { vedtakId: (vedtakData as VedtakData).id });
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

