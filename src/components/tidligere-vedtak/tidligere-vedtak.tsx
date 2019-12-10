import React from 'react';
import { VedtakData } from '../../rest/data/vedtak';
import { Undertittel } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import { TidligereVedtakLenkePanel } from './tidligere-vedtak-panel/tidligere-vedtak-panel';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import './tidligere-vedtak.less';

export function TidligereVedtak({ vedtakHistorikk }: { vedtakHistorikk: VedtakData[] }) {
	const { changeView } = useViewStore();
	const historikk = [...vedtakHistorikk];

	historikk.sort((v1, v2) => {
		const d1 = dayjs(v1.sistOppdatert);
		const d2 = dayjs(v2.sistOppdatert);
		return d1.isBefore(d2) ? 1 : -1;
	});

	function handleTidligereVedtakClicked(vedtakId: number, posisjon: number) {
		changeView(ViewType.VEDTAK, { vedtakId });
		frontendlogger.logMetrikk('vis-tidligere-vedtak', { index: posisjon });
	}

	return (
        <div className="tidligere-vedtak">
	        <Undertittel className="tidligere-vedtak__tittel" tag="h1">Tidligere oppfølgingsvedtak</Undertittel>
	        <ul className="tidligere-vedtak__liste">
		        {historikk.map((tidligereVedtak, idx) => (
		        	<li className="tidligere-vedtak__liste-item" key={idx}>
				        <TidligereVedtakLenkePanel
					        onClick={handleTidligereVedtakClicked}
					        tidligereVedtak={tidligereVedtak}
					        posisjon={idx}
				        />
			        </li>
		        ))}
	        </ul>
        </div>
	);
}

