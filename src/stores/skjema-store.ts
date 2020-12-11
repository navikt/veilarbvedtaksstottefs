import { useState } from 'react';
import constate from 'constate';
import { SkjemaFeil } from '../utils/types/skjema-feil';
import {
	mapKilderFraForskjelligMalformTilBokmal,
	validerBegrunnelseMaxLength,
	validerSkjema as valider
} from '../utils/skjema-utils';
import { OrNothing } from '../utils/types/ornothing';
import { HovedmalType, InnsatsgruppeType, Vedtak } from '../rest/data/vedtak';
import { SkjemaLagringStatus } from '../utils/types/skjema-lagring-status';

export const [SkjemaStoreProvider, useSkjemaStore] = constate(() => {
	const [kilder, setKilder] = useState<string[]>([]);
	const [hovedmal, setHovedmal] = useState<OrNothing<HovedmalType>>();
	const [innsatsgruppe, setInnsatsgruppe] = useState<OrNothing<InnsatsgruppeType>>();
	const [begrunnelse, setBegrunnelse] = useState<OrNothing<string>>('');
	const [sistOppdatert, setSistOppdatert] = useState('');
	const [errors, setErrors] = useState<SkjemaFeil>({});
	const [lagringStatus, setLagringStatus] = useState<SkjemaLagringStatus>(SkjemaLagringStatus.INGEN_ENDRING);
	const [harForsoktAForhandsvise, setHarForsoktAForhandsvise] = useState<boolean>(false);

	const validerSkjema = (gjeldendeVedtak: OrNothing<Vedtak>): SkjemaFeil => {
		const feil = valider({ kilder, hovedmal, innsatsgruppe, begrunnelse }, gjeldendeVedtak);
		setErrors(feil);
		return feil;
	};

	const validerBegrunnelseLengde = () => {
		const begrunnelseFeil = validerBegrunnelseMaxLength(begrunnelse);
		setErrors(Object.assign({}, errors, begrunnelseFeil));
	};

	const initSkjema = (utkast: Vedtak) => {
		const mappetKilder = mapKilderFraForskjelligMalformTilBokmal(utkast.opplysninger);
		setHovedmal(utkast.hovedmal);
		setKilder(mappetKilder);
		setInnsatsgruppe(utkast.innsatsgruppe);
		setBegrunnelse(utkast.begrunnelse);
		setSistOppdatert(utkast.sistOppdatert);
	};

	const resetSkjema = () => {
		setHovedmal(undefined);
		setKilder([]);
		setInnsatsgruppe(undefined);
		setBegrunnelse(undefined);
		setSistOppdatert('');
		setErrors({});
	};

	return {
		kilder,
		setKilder,
		hovedmal,
		setHovedmal,
		innsatsgruppe,
		setInnsatsgruppe,
		begrunnelse,
		setBegrunnelse,
		sistOppdatert,
		setSistOppdatert,
		errors,
		lagringStatus,
		setLagringStatus,
		harForsoktAForhandsvise,
		setHarForsoktAForhandsvise,
		validerSkjema,
		validerBegrunnelseLengde,
		initSkjema,
		resetSkjema
	};
});
