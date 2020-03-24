import { useState } from 'react';
import createUseContext from 'constate';
import { Veileder } from '../rest/data/veiledere';
import { kanEndreUtkast, VeilederTilgang } from '../utils/tilgang';

export const useInnloggetVeilederStore = createUseContext(() => {
	const [veilederTilgang, setVeilederTilgang] = useState<VeilederTilgang>(VeilederTilgang.IKKE_ANSVARLIG_VEILEDER);
	const [innloggetVeileder, setInnloggetVeileder] = useState<Veileder>();

	return {
		kanEndreUtkast: kanEndreUtkast(veilederTilgang),
		veilederTilgang, setVeilederTilgang,
		innloggetVeileder, setInnloggetVeileder
	};
});
