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
	const { dialogerMeldingerFetcher } = useDataFetcherStore();
	const { dialogMeldinger, innloggetVeileder } = useDataStore();

	const sorterteDialoger = useMemo(() => {
		return [...dialogMeldinger].sort((d1, d2) => sortDatesAsc(d1.opprettet, d2.opprettet));
	}, [dialogMeldinger]);

	useEffect(() => {
		if (isNotStarted(dialogerMeldingerFetcher)) {
			// Dette blir plukket opp av DialogMeldingerSync
			dialogerMeldingerFetcher.fetch({ fnr });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dialogerMeldingerFetcher.status]);

    return (
    	<div className="dialog">
		    <MeldingListe meldinger={sorterteDialoger} innloggetVeilederIdent={innloggetVeileder.ident} />
		    <Show if={dialogerMeldingerFetcher.status === FetchStatus.PENDING}>
				<Spinner />
		    </Show>
		    <Skrivefelt />
	    </div>
    );
};
