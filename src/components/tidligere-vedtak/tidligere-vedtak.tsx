import React, { useMemo } from 'react';
import { ModiaVedtak } from '../../rest/data/vedtak';
import { Undertittel } from 'nav-frontend-typografi';
import {
	TidligereVedtakLenkePanel
} from './tidligere-vedtak-panel/tidligere-vedtak-panel';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import './tidligere-vedtak.less';
import { sortDates } from '../../utils/date-utils';

export type OnTidligereVedtakClicked = (vedtakData: ModiaVedtak, idx: number) => void;

export function TidligereVedtak({ modiaHistorikk }: { modiaHistorikk: ModiaVedtak[] }) {
	const { changeView } = useViewStore();

	const tidligereVedtak = useMemo(() => {
		return [...modiaHistorikk].sort((v1, v2) => sortDates(v1.sistOppdatert, v2.sistOppdatert));
	}, [modiaHistorikk]);

	function handleTidligereVedtakClicked(vedtakData: ModiaVedtak, idx: number) {
		changeView(ViewType.VEDTAK, { vedtakId: (vedtakData as ModiaVedtak).id });
		frontendlogger.logMetrikk('vis-tidligere-vedtak', { index: idx });
	}

	return (
        <div className="tidligere-vedtak">
	        <Undertittel className="tidligere-vedtak__tittel" tag="h1">Tidligere oppfølgingsvedtak</Undertittel>
	        <ul className="tidligere-vedtak__liste">
		        {tidligereVedtak.map((vedtak, idx) => (
                    <li className="tidligere-vedtak__liste-item" key={idx}>
				        <TidligereVedtakLenkePanel
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

