import React, { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import { Systemtittel } from 'nav-frontend-typografi';
import Opplysninger from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';
import './skjema.less';
import {
    byggOpplysningliste,
    byggOpplysningsObject,
} from './skjema-utils';

import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { SkjemaData } from '../../pages/skjema/vedtakskjema';

export type Opplysning = {
    [key: string]: boolean
};

interface SkjemaProps {
    errors: SkjemaFeil;
    setSkjema: (skjema: SkjemaData) => void;
    utkast: SkjemaData;
}

function Skjema ({errors, setSkjema, utkast}: SkjemaProps) {
    const [opplysninger, setOpplysninger] = useState<Opplysning[]>([]);
    const [hovedmal, handleHovedmalChanged] = useState( utkast.hovedmal);
    const [innsatsgruppe, handleInnsatsgruppeChanged] = useState(utkast.innsatsgruppe);
    const [begrunnelse, handleBegrunnelseChanged] = useState(utkast.begrunnelse);

    useEffect(() => {
        const opplysningerListe = byggOpplysningsObject(utkast.opplysninger) as Opplysning[];
        setOpplysninger(opplysningerListe);
    }, []);

    useEffect(() => {
        const skjema: SkjemaData = {opplysninger: byggOpplysningliste(opplysninger), hovedmal, innsatsgruppe, begrunnelse};
        setSkjema(skjema);
    }, [opplysninger, hovedmal, innsatsgruppe, begrunnelse]);

    function handleOpplysningerChanged (index: number, opplysning: Opplysning) {
        if (Object.keys(opplysning)[0].trim()) {
            setOpplysninger(prevState => {
                if (index === prevState.length) {
                    return [...prevState, opplysning];
                }
                return prevState.map((prevOpplysning, idx) => {
                    if (idx === index) {
                        return opplysning;
                    }
                    return prevOpplysning;
                });
            });
        }
    }

    function handleOpplysningerChecked (opplysning: Opplysning) {
        setOpplysninger(prevState => {
            return prevState.map(prevOpplysning => {
                if (Object.keys(prevOpplysning)[0] === Object.keys(opplysning)[0]) {
                    return opplysning;
                }
                return prevOpplysning;
            });
        });
    }
    return (
        <Card >
            <Systemtittel className="skjema__tittel">
                Oppfølgingsvedtak (§ 14a)
            </Systemtittel>
            <Hovedmal
                handleHovedmalChanged={handleHovedmalChanged}
                hovedmal={hovedmal}
                hovedmalfeil={errors.hovedmal}
            />
            <Innsatsgruppe
                handleInnsatsgruppeChanged={handleInnsatsgruppeChanged}
                innsatsgruppe={innsatsgruppe}
                innsatgruppefeil={errors.innsatsgruppe}
            />
            <Begrunnelse
                innsatsgruppe={innsatsgruppe}
                hovedmal={hovedmal}
                begrunnelseTekst={begrunnelse}
                handleBegrunnelseChanged={handleBegrunnelseChanged}
                begrunnelsefeil={errors.begrunnelse}
            />
            <Opplysninger
                handleOpplysningerChanged={handleOpplysningerChanged}
                handleOpplysningerChecked={handleOpplysningerChecked}
                opplysninger={opplysninger}
                opplysningerfeil={errors.opplysninger}
            />
        </Card>
    );
}

export default Skjema;
