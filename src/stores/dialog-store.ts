import { useState } from 'react';
import createUseContext from 'constate';
import { DialogMelding } from '../rest/data/dialog-melding';

export const useDialogStore = createUseContext(() => {
	const [meldinger, setMeldinger] = useState<DialogMelding[]>([]);

	function leggTilMelding(melding: string, ident: string, navn: string) {
		const dialogMelding: DialogMelding = {
			melding,
			opprettet: new Date().toISOString(),
			opprettetAvIdent: ident,
			opprettetAvNavn: navn
		};

		setMeldinger((curMeldinger) => [...curMeldinger, dialogMelding])
	}

	return { meldinger, setMeldinger, leggTilMelding };
});
