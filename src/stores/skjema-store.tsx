import React, { useState } from 'react';
import { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';
import { Opplysning } from '../components/skjema/opplysninger/opplysninger';
import createUseContext from 'constate';

export const useSkjemaStore = createUseContext(() => {
    const [opplysninger, setOpplysninger] = useState<Opplysning[]>([]);
    const [hovedmal, setHovedmal] = useState<HovedmalType | undefined>();
    const [innsatsgruppe, setInnsatsgruppe] = useState<InnsatsgruppeType | undefined>();
    const [begrunnelse, setBegrunnelse] = useState('');
    const [sistOppdatert, setSistOppdatert] = useState('');

    return {
        opplysninger, setOpplysninger,
        hovedmal, setHovedmal,
        innsatsgruppe, setInnsatsgruppe,
        begrunnelse, setBegrunnelse,
        sistOppdatert, setSistOppdatert
    };
});
