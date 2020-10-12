import { useState } from 'react';
import constate from 'constate';
import {
	erAnsvarligVeileder,
	erBeslutter,
	erIkkeAnsvarligVeileder,
	kanEndreUtkast,
	VeilederTilgang
} from '../utils/tilgang';

export const [TilgangStoreProvider, useTilgangStore] = constate(() => {
	const [veilederTilgang, setVeilederTilgang] = useState<VeilederTilgang>(VeilederTilgang.IKKE_ANSVARLIG_VEILEDER);

	return {
		kanEndreUtkast: kanEndreUtkast(veilederTilgang),
		erBeslutter: erBeslutter(veilederTilgang),
		erAnsvarligVeileder: erAnsvarligVeileder(veilederTilgang),
		erIkkeAnsvarligVeileder: erIkkeAnsvarligVeileder(veilederTilgang),
		veilederTilgang, setVeilederTilgang,
	};
});
