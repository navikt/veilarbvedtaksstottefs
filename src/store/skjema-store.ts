import { useState } from 'react';
import constate from 'constate';
import { OrNothing } from '../util/type/ornothing';
import { HovedmalType, InnsatsgruppeType, Utkast, Vedtak } from '../api/veilarbvedtaksstotte';
import { SkjemaFeil } from '../util/type/skjema-feil';
import { SkjemaLagringStatus } from '../util/type/skjema-lagring-status';
import {
	mapKilderFraForskjelligMalformTilBokmal,
	validerBegrunnelseMaxLength,
	validerSkjema
} from '../util/skjema-utils';

export const [SkjemaStoreProvider, useSkjemaStore] = constate(() => {
	const [valgteKilder, setValgteKilder] = useState<string[]>([]);
	const [hovedmal, setHovedmal] = useState<OrNothing<HovedmalType>>();
	const [innsatsgruppe, setInnsatsgruppe] = useState<OrNothing<InnsatsgruppeType>>();
	const [begrunnelse, setBegrunnelse] = useState<OrNothing<string>>('');
	const [sistOppdatert, setSistOppdatert] = useState('');
	const [errors, setErrors] = useState<SkjemaFeil>({});
	const [lagringStatus, setLagringStatus] = useState<SkjemaLagringStatus>(SkjemaLagringStatus.INGEN_ENDRING);
	const [harForsoktAForhandsvise, setHarForsoktAForhandsvise] = useState<boolean>(false);

	const valider = (gjeldendeVedtak: OrNothing<Vedtak>): SkjemaFeil => {
		const feil = validerSkjema(
			{ opplysninger: valgteKilder, hovedmal, innsatsgruppe, begrunnelse },
			gjeldendeVedtak
		);
		setErrors(feil);
		return feil;
	};

	const validerBegrunnelseLengde = () => {
		const begrunnelseFeil = validerBegrunnelseMaxLength(begrunnelse);
		setErrors(Object.assign({}, errors, begrunnelseFeil));
	};

	const initSkjema = (utkast: Utkast) => {
		const mappetKilder = mapKilderFraForskjelligMalformTilBokmal(utkast.opplysninger);
		setHovedmal(utkast.hovedmal);
		setValgteKilder(mappetKilder);
		setInnsatsgruppe(utkast.innsatsgruppe);
		setBegrunnelse(utkast.begrunnelse);
		setSistOppdatert(utkast.utkastSistOppdatert);
	};

	const resetSkjema = () => {
		setHovedmal(undefined);
		setValgteKilder([]);
		setInnsatsgruppe(undefined);
		setBegrunnelse(undefined);
		setSistOppdatert('');
		setErrors({});
	};

	return {
		valgteKilder,
		setValgteKilder,
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
		validerSkjema: valider,
		validerBegrunnelseLengde,
		initSkjema,
		resetSkjema
	};
});
