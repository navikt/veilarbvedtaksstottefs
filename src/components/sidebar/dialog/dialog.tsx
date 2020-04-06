import React, { useEffect, useMemo } from 'react';
import { Skrivefelt } from './skrivefelt/skrivefelt';
import { MeldingListe } from './melding-liste/melding-liste';
import { useDataStore } from '../../../stores/data-store';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { sortDatesAsc } from '../../../utils/date-utils';
import './dialog.less';
import { FetchStatus, isNotStarted } from '../../../rest/utils';
import { useAppStore } from '../../../stores/app-store';
import Show from '../../show';
import Spinner from '../../spinner/spinner';

export const Dialog = () => {
	const { fnr } = useAppStore();
	const { meldingFetcher } = useDataFetcherStore();
	const { meldinger, innloggetVeileder } = useDataStore();

	const sorterteMeldinger = useMemo(() => {
		return [...meldinger].sort((d1, d2) => sortDatesAsc(d1.opprettet, d2.opprettet));
	}, [meldinger]);

	useEffect(() => {
		if (isNotStarted(meldingFetcher)) {
			// Dette blir plukket opp av DialogMeldingerSync
			meldingFetcher.fetch({ fnr });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [meldingFetcher.status]);

    return (
    	<div className="dialog">
			<h1>helloooo</h1>
		    <MeldingListe meldinger={sorterteMeldinger} innloggetVeilederIdent={innloggetVeileder.ident} />
		    <Show if={meldingFetcher.status === FetchStatus.PENDING}>
				<Spinner />
		    </Show>
		    <Skrivefelt />
	    </div>
    );
};
