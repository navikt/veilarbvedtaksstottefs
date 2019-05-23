import React from 'react';
import Card from '../../components/card/card';
import { Systemtittel } from 'nav-frontend-typografi';
import Opplysninger from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';
import './skjema.less';
import { SkjemaFeil } from '../../utils/types/skjema-feil';

interface SkjemaProps {
    errors: SkjemaFeil;
}

function Skjema ({errors}: SkjemaProps) {
    return (
        <Card >
            <Systemtittel className="skjema__tittel">
                Oppfølgingsvedtak (§ 14a)
            </Systemtittel>
            <Hovedmal hovedmalfeil={errors.hovedmal}/>
            <Innsatsgruppe innsatgruppefeil={errors.innsatsgruppe}/>
            <Begrunnelse begrunnelsefeil={errors.begrunnelse}/>
            <Opplysninger opplysningerfeil={errors.opplysninger}/>
        </Card>
    );
}

export default Skjema;
