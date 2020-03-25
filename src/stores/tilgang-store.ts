import { useState } from 'react';
import createUseContext from 'constate';
import { kanEndreUtkast, VeilederTilgang } from '../utils/tilgang';

export const useTilgangStore = createUseContext(() => {
	const [veilederTilgang, setVeilederTilgang] = useState<VeilederTilgang>(VeilederTilgang.IKKE_ANSVARLIG_VEILEDER);

	return {
		kanEndreUtkast: kanEndreUtkast(veilederTilgang),
		veilederTilgang, setVeilederTilgang,
	};
});
