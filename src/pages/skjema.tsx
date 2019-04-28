import React, { useContext, useState } from 'react';
import Card from '../components/card/card';
import { Systemtittel } from 'nav-frontend-typografi';
import Opplysninger, { OpplysningType } from '../components/skjema/opplysninger/opplysninger';
import Hovedmal, { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe, { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../components/skjema/begrunnelse/begrunnelse';
import Aksjoner from '../components/skjema/aksjoner/aksjoner';
import './skjema.less';
import axios from 'axios';
import { OrNothing } from '../utils/types/ornothing';
import { AppContext } from '../components/app-provider/app-provider';

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
    const {vedtakUtkast} = useContext(AppContext);

    const [opplysninger, setOpplysninger] = useState<Opplysninger>({} as Opplysninger);
    const [hovedmal, handleHovedmalChanged] = useState(vedtakUtkast && vedtakUtkast.hovedmal);
    const [innsatsgruppe, handleKonklusjonChanged] = useState(vedtakUtkast && vedtakUtkast.innsatsgruppe);
    const [begrunnelseTekst, handleBegrunnelseChanged] = useState(vedtakUtkast && vedtakUtkast.begrunnelse || '');

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
                    hovedmal={hovedmal}
                />
                <Innsatsgruppe
                    handleKonklusjonChanged={handleKonklusjonChanged}
                    innsatsgruppe={innsatsgruppe}
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
