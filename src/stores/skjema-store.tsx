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

export const useSkjemaStore = createUseContext(() => {
    const [opplysninger, setOpplysninger] = useState<Opplysning[]>([]);
    const [hovedmal, setHovedmal] = useState<HovedmalType | undefined>();
    const [innsatsgruppe, setInnsatsgruppe] = useState<InnsatsgruppeType | undefined>();
    const [begrunnelse, setBegrunnelse] = useState('');
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

    return {
        opplysninger, setOpplysninger,
        hovedmal, setHovedmal,
        innsatsgruppe, setInnsatsgruppe,
        begrunnelse, setBegrunnelse,
        sistOppdatert, setSistOppdatert,
        errors, validerSkjema, validerBegrunnelseLengde
    };
});
