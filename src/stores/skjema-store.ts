import { useState } from 'react';
import createUseContext from 'constate';
import { SkjemaFeil } from '../utils/types/skjema-feil';
import { mapOpplysningerFraForskjelligMalformTilBokmal, validerBegrunnelseMaxLength, validerSkjema as valider } from '../utils/skjema-utils';
import { OrNothing } from '../utils/types/ornothing';
import { BeslutterProsessStatus, HovedmalType, InnsatsgruppeType, Vedtak } from '../rest/data/vedtak';
import { SkjemaLagringStatus } from '../utils/types/skjema-lagring-status';

export const useSkjemaStore = createUseContext(() => {
	const [opplysninger, setOpplysninger] = useState<string[]>([]);
	const [hovedmal, setHovedmal] = useState<OrNothing<HovedmalType>>();
	const [innsatsgruppe, setInnsatsgruppe] = useState<OrNothing<InnsatsgruppeType>>();
	const [begrunnelse, setBegrunnelse] = useState<OrNothing<string>>('');
	const [sistOppdatert, setSistOppdatert] = useState('');
	const [errors, setErrors] = useState<SkjemaFeil>({});
	const [lagringStatus, setLagringStatus] = useState<SkjemaLagringStatus>(SkjemaLagringStatus.INGEN_ENDRING);
	const [beslutterProsessStatus, setBeslutterProsessStatus] = useState<OrNothing<BeslutterProsessStatus>>();

	const validerSkjema = (gjeldendeVedtak: OrNothing<Vedtak>): SkjemaFeil => {
		const feil = valider({ opplysninger, hovedmal, innsatsgruppe, begrunnelse }, gjeldendeVedtak);
		setErrors(feil);
		return feil;
	};

	const validerBegrunnelseLengde = () => {
		const begrunnelseFeil = validerBegrunnelseMaxLength(begrunnelse);
		setErrors(Object.assign({}, errors, begrunnelseFeil));
	};

	const initSkjema = (utkast: Vedtak) => {
		const mappetOpplysninger = mapOpplysningerFraForskjelligMalformTilBokmal(utkast.opplysninger);
		setHovedmal(utkast.hovedmal);
		setOpplysninger(mappetOpplysninger);
		setInnsatsgruppe(utkast.innsatsgruppe);
		setBegrunnelse(utkast.begrunnelse);
		setSistOppdatert(utkast.sistOppdatert);
		setBeslutterProsessStatus(utkast.beslutterProsessStatus);
	};

	const resetSkjema = () => {
		setHovedmal(undefined);
		setOpplysninger([]);
		setInnsatsgruppe(undefined);
		setBegrunnelse(undefined);
		setSistOppdatert('');
		setErrors({});
		setBeslutterProsessStatus(undefined);
	};

	return {
		opplysninger, setOpplysninger,
		hovedmal, setHovedmal,
		innsatsgruppe, setInnsatsgruppe,
		begrunnelse, setBegrunnelse,
		sistOppdatert, setSistOppdatert, errors,
		lagringStatus, setLagringStatus,
		beslutterProsessStatus, setBeslutterProsessStatus,
		validerSkjema, validerBegrunnelseLengde,
		initSkjema, resetSkjema
	};
});
