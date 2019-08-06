import React, { useState } from 'react';
import { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';
import createUseContext from 'constate';
import { SkjemaFeil } from '../utils/types/skjema-feil';
import {
	mapTilTekstliste,
	validerBegrunnelseMaxLength,
	validerSkjema as valider
} from '../components/skjema/skjema-utils';
import { Opplysning } from '../components/skjema/opplysninger/opplysninger';
import { OrNothing } from '../utils/types/ornothing';
import { VedtakData } from '../rest/data/vedtak';

export const useSkjemaStore = createUseContext(() => {
	const [opplysninger, setOpplysninger] = useState<Opplysning[]>([]);
	const [hovedmal, setHovedmal] = useState<OrNothing<HovedmalType>>();
	const [innsatsgruppe, setInnsatsgruppe] = useState<OrNothing<InnsatsgruppeType>>();
	const [begrunnelse, setBegrunnelse] = useState<OrNothing<string>>('');
	const [sistOppdatert, setSistOppdatert] = useState('');
	const [errors, setErrors] = useState<SkjemaFeil>({});

	const validerSkjema = (): boolean => {
		const opplysningerListe = mapTilTekstliste(opplysninger);
		const feil = valider({ opplysninger: opplysningerListe, hovedmal, innsatsgruppe, begrunnelse });
		setErrors(feil);
		return Object.keys(feil).length === 0;
	};

	const validerBegrunnelseLengde = () => {
		const begrunnelseFeil = validerBegrunnelseMaxLength(begrunnelse);
		setErrors(Object.assign({}, errors, begrunnelseFeil));
	};

	const initSkjema = (utkast: VedtakData, opplysningerListe: Opplysning[]) => {
		setHovedmal(utkast.hovedmal);
		setOpplysninger(opplysningerListe);
		setInnsatsgruppe(utkast.innsatsgruppe);
		setBegrunnelse(utkast.begrunnelse);
		setSistOppdatert(utkast.sistOppdatert);
	};

	const resetSkjema = () => {
		setHovedmal(undefined);
		setOpplysninger([]);
		setInnsatsgruppe(undefined);
		setBegrunnelse(undefined);
		setSistOppdatert('');
		setErrors({});
	};

	return {
		opplysninger,
		setOpplysninger,
		hovedmal,
		setHovedmal,
		innsatsgruppe,
		setInnsatsgruppe,
		begrunnelse,
		setBegrunnelse,
		sistOppdatert,
		setSistOppdatert,
		errors,
		validerSkjema,
		validerBegrunnelseLengde,
		initSkjema,
		resetSkjema
	};
});
