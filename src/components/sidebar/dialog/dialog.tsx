import React, { useEffect, useMemo } from 'react';
import { Skrivefelt } from './skrivefelt/skrivefelt';
import { MeldingListe } from './melding-liste/melding-liste';
import { useDialogStore } from '../../../stores/dialog-store';
import { useFetchStore } from '../../../stores/fetch-store';
import { sortDatesDesc } from '../../../utils/date-utils';
import './dialog.less';
import { FetchStatus, isNotStarted } from '../../../rest/utils';
import { useAppStore } from '../../../stores/app-store';
import Show from '../../show';
import Spinner from '../../spinner/spinner';

export const Dialog = () => {
	const { fnr } = useAppStore();
	const { meldinger } = useDialogStore();
	const { innloggetVeileder, dialogerMeldinger } = useFetchStore();

	const sorterteDialoger = useMemo(() => {
		return [...meldinger].sort((d1, d2) => sortDatesDesc(d1.opprettet, d2.opprettet));
	}, [meldinger]);

	useEffect(() => {
		if (isNotStarted(dialogerMeldinger)) {
			// Dette blir plukket opp av DialogMeldingerSync
			dialogerMeldinger.fetch({ fnr });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dialogerMeldinger]);

    return (
    	<div className="dialog">
		    <MeldingListe meldinger={sorterteDialoger} innloggetVeilederIdent={innloggetVeileder.data.ident} />
		    <Show if={dialogerMeldinger.status === FetchStatus.PENDING}>
				<Spinner />
		    </Show>
		    <Skrivefelt />
	    </div>
    );
};
