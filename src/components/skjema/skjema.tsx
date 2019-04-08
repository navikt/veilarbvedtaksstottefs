import * as React from 'react';
import Card from '../card/card';
import { Systemtittel } from 'nav-frontend-typografi';
import Opplysninger from './opplysninger/opplysninger';
import Hovedmal from './hovedmal/hovedmal';
import Konklusjon from './konklusjon/konklusjon';
import Begrunnelse from './begrunnelse/begrunnelse';
import Aksjoner from './aksjoner/aksjoner';
import './skjema.less';

const Skjema: React.FunctionComponent = () => {
    return (
        <Card className="skjema">
            <Systemtittel className="skjema__tittel">
                Oppfølgingsvedtak (§ 14a)
            </Systemtittel>
            <Opplysninger/>
            <Hovedmal/>
            <Konklusjon/>
            <Begrunnelse/>
            <Aksjoner/>
        </Card>
    );
};

export default Skjema;
