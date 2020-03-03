import React from 'react';
import './beslutter-dialog.less';
import { Skrivefelt } from './skrivefelt/skrivefelt';
import { MeldingListe } from './melding-liste/melding-liste';
import { useDialogStore } from '../../stores/dialog-store';
import { useFetchStore } from '../../stores/fetch-store';

export const BeslutterDialog = () => {
	const { innloggetVeileder } = useFetchStore();
	const { dialoger } = useDialogStore();

    return (
    	<section className="beslutter-dialog">
		    <MeldingListe meldinger={dialoger} innloggetVeilederIdent={innloggetVeileder.data.ident} />
		    <Skrivefelt />
	    </section>
    );
};
