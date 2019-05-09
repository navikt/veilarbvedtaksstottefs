import React, { useContext, useMemo, useState } from 'react';
import Card from '../../components/card/card';
import { Systemtittel } from 'nav-frontend-typografi';
import Opplysninger, { OpplysningType } from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal, { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe, { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import './skjema.less';
import axios from 'axios';
import { OrNothing } from '../../utils/types/ornothing';
import { AppContext } from '../../components/app-provider/app-provider';
import { ViewDispatch } from '../../components/viewcontroller/view-controller';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { Status } from '../../utils/hooks/fetch-hook';
import { VedtakData } from '../../utils/types/vedtak';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';

interface SkjemaProps {
    fnr: string;
}

type Opplysninger = {
    [K in OpplysningType]: boolean;
};

interface SkjemaData {
    opplysninger: string[];
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
    andreOpplysninger: string[];
}

function Skjema ({fnr}: SkjemaProps) {
    const {vedtak, setVedtak} = useContext(AppContext);
    const {dispatch} = useContext(ViewDispatch);
    const utkast = useMemo(() => vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST'), [vedtak.data]);

    const opplysningData = byggOpplysningsObject(utkast && utkast.opplysninger) || {} as Opplysninger ;
    const [opplysninger, setOpplysninger] = useState<Opplysninger>(opplysningData);
    const [hovedmal, handleHovedmalChanged] = useState( utkast && utkast.hovedmal);
    const [innsatsgruppe, handleKonklusjonChanged] = useState(utkast && utkast.innsatsgruppe);
    const [begrunnelse, handleBegrunnelseChanged] = useState(utkast && utkast.begrunnelse || '');
    const [andreOpplysninger, handleAndreopplysninger] = useState(utkast && utkast.andreopplysninger || []);

    function putVedtakk(skjema: SkjemaData) {
        return axios.put(`/veilarbvedtaksstotte/api/${fnr}/utkast`, skjema);
    }

    function byggOpplysningsObject (opplysningerListe: string []) {
        return (opplysningerListe ? opplysningerListe : []).reduce((acc: Opplysninger, opplysning ) => {
            acc[opplysning as OpplysningType] = true;
            return acc;
        }, {} as Opplysninger);
    }

    function byggOpplysningliste (opplysningerObj: Opplysninger) {
        return Object.entries(opplysningerObj).reduce((acc, [key, value]) => value ? [...acc, key as OpplysningType] : acc, [] as OpplysningType[]);
    }

    function handleSubmit (e: any) {
        e.preventDefault();
        const skjema: SkjemaData = {opplysninger: byggOpplysningliste(opplysninger), hovedmal, innsatsgruppe, begrunnelse, andreOpplysninger};
        try {
            putVedtakk(skjema).then(() =>  {
                setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
                dispatch({view: ActionType.HOVEDSIDE});
            });
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
        <>
            <TilbakeKnapp tilbake={(e) => handleSubmit(e)}/>
            <Card className="skjema">
                <Systemtittel className="skjema__tittel">
                    Oppfølgingsvedtak (§ 14a)
                </Systemtittel>
                <Hovedmal
                    handleHovedmalChanged={handleHovedmalChanged}
                    hovedmal={hovedmal}
                />
                <Innsatsgruppe
                    handleKonklusjonChanged={handleKonklusjonChanged}
                    innsatsgruppe={innsatsgruppe}
                />
                <Begrunnelse
                    begrunnelseTekst={begrunnelse}
                    handleBegrunnelseChanged={handleBegrunnelseChanged}
                />
                <Opplysninger
                    handleOpplysningerChanged={handleOpplysningerChanged}
                    handleAndraOpplysningerChanged={handleAndreopplysninger}
                    andreOpplysninger={andreOpplysninger}
                />
                <Aksjoner handleSubmit={handleSubmit}/>
            </Card>
        </>
    );
}

export default Skjema;
