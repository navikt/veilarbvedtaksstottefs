import React, { useMemo } from 'react';
import { Skrivefelt } from './skrivefelt/skrivefelt';
import { MeldingListe } from './melding-liste/melding-liste';
import { useDialogStore } from '../../stores/dialog-store';
import { useFetchStore } from '../../stores/fetch-store';
import { sortDatesDesc } from '../../utils/date-utils';
import './beslutter-dialog.less';

export const BeslutterDialog = () => {
	const { innloggetVeileder } = useFetchStore();
	const { dialoger } = useDialogStore();

	const sorterteDialoger = useMemo(() => {
		return [...dialoger].sort((d1, d2) => sortDatesDesc(d1.dato, d2.dato));
	}, [dialoger]);

    return (
    	<section className="beslutter-dialog">
		    <MeldingListe meldinger={sorterteDialoger} innloggetVeilederIdent={innloggetVeileder.data.ident} />
		    <Skrivefelt />
	    </section>
    );
};
