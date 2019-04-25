import React, { useState } from 'react';
import Card from '../card/card';
import { Systemtittel } from 'nav-frontend-typografi';
import Opplysninger, { OpplysningType } from './opplysninger/opplysninger';
import Hovedmal, { HovedmalType } from './hovedmal/hovedmal';
import Innsatsgruppe, { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import Begrunnelse from './begrunnelse/begrunnelse';
import Aksjoner from './aksjoner/aksjoner';
import './skjema.less';
import { OrNothing } from '../../utils/types/ornothing';
import axios from 'axios';

interface SkjemaProps {
    fnr: string;
}

type Opplysninger = {
    [K in OpplysningType]: boolean;
};

interface SkjemaData {
    opplysninger: OrNothing<Opplysninger>;
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelseTekst: string;
}

function Skjema ({fnr}: SkjemaProps) {
    const [opplysninger, setOpplysninger] = useState<Opplysninger>({} as Opplysninger);
    const [hovedmal, handleHovedmalChanged] = useState(null);
    const [innsatsgruppe, handleKonklusjonChanged] = useState(null);
    const [begrunnelseTekst, handleBegrunnelseChanged] = useState('');

    function putVedtakk(skjema: SkjemaData) {
        axios.put(`/veilarbvedtaksstotte/api/vedtak/${fnr}`, skjema);
    }

    function handleSubmit (e: any) {
        e.preventDefault();
        const skjema: SkjemaData = {opplysninger, hovedmal, innsatsgruppe, begrunnelseTekst};
        try {
            putVedtakk(skjema);
        } catch (e) {
             console.log(e); // tslint:disable-line:no-console
        }

    }

    function handleOpplysningerChanged (e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        setOpplysninger(prevOpplysninger => {
            prevOpplysninger[e.target.name as OpplysningType] = e.target.checked;
            return prevOpplysninger;
        });
    }

    return (
        <form>
            <Card className="skjema">
                <Systemtittel className="skjema__tittel">
                    Oppfølgingsvedtak (§ 14a)
                </Systemtittel>
                <Opplysninger
                    handleOpplysningerChanged={handleOpplysningerChanged}
                />
                <Hovedmal
                    handleHovedmalChanged={handleHovedmalChanged}
                />
                <Innsatsgruppe
                    handleKonklusjonChanged={handleKonklusjonChanged}
                />
                <Begrunnelse
                    begrunnelseTekst={begrunnelseTekst}
                    handleBegrunnelseChanged={handleBegrunnelseChanged}
                />
                <Aksjoner handleSubmit={handleSubmit}/>
            </Card>
        </form>
    );
}

export default Skjema;
