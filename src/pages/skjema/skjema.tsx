import React, { useContext, useState } from 'react';
import Card from '../../components/card/card';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Opplysninger, { OpplysningType } from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal, { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe, { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import './skjema.less';
import { OrNothing } from '../../utils/types/ornothing';
import { ViewDispatch } from '../../components/providers/view-provider';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { VedtakData } from '../../utils/types/vedtak';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import { byggOpplysningliste, byggOpplysningsObject, validerSkjema } from '../../components/skjema/skjema-utils';
import { useTimer } from '../../utils/hooks/useTimer';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { Status } from '../../utils/fetch-utils';
import { useGlobalFetch } from '../../utils/hooks/useFetch';
import { useFetchState } from '../../components/providers/fetch-provider';

interface SkjemaProps {
    fnr: string;
}

export type ValgtOpplysninger = {
    [K in OpplysningType]: boolean;
};

export interface SkjemaData {
    opplysninger: string[];
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
    andreOpplysninger: string[];
}

function Skjema ({fnr}: SkjemaProps) {
    const [vedtak, setVedtak] = useFetchState('vedtak');
    const {dispatch} = useContext(ViewDispatch);

    const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');

    const opplysningData = byggOpplysningsObject(utkast && utkast.opplysninger);
    const [opplysninger, setOpplysninger] = useState<ValgtOpplysninger>(opplysningData);
    const [hovedmal, handleHovedmalChanged] = useState( utkast && utkast.hovedmal);
    const [innsatsgruppe, handleInnsatsgruppeChanged] = useState(utkast && utkast.innsatsgruppe);
    const [begrunnelse, handleBegrunnelseChanged] = useState(utkast && utkast.begrunnelse || '');
    const [andreOpplysninger, handleAndreopplysninger] = useState(utkast && utkast.andreopplysninger || []);
    const [sistLagret, setSistLagret] = useState('');
    const [errors, setErrors] = useState<SkjemaFeil>({});

    useTimer(oppdaterSistEndret, 2000, [opplysninger, hovedmal, innsatsgruppe, begrunnelse, andreOpplysninger]);

    function sendDataTilBackend (skjema: SkjemaData) {
        return VedtaksstotteApi.putVedtakUtkast(fnr, skjema);
    }

    function dispatchFetchVedtakOgRedirectTilHovedside () {
        setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
        dispatch({view: ActionType.HOVEDSIDE});
    }

    function oppdaterSistEndret () {
        const skjema: SkjemaData = {opplysninger: byggOpplysningliste(opplysninger), hovedmal, innsatsgruppe, begrunnelse, andreOpplysninger};
        sendDataTilBackend(skjema).then(() => {
            const date = new Date();
            const dato = date.toISOString().slice(0, 10);
            const tid = date.toLocaleTimeString('no');
            setSistLagret(`${dato} ${tid}`);
        });
    }

    function handleSubmit (e?: any) {
        e.preventDefault();
        const skjema: SkjemaData = {opplysninger: byggOpplysningliste(opplysninger), hovedmal, innsatsgruppe, begrunnelse, andreOpplysninger};
        const skjemaFeil = validerSkjema(skjema);
        if (Object.entries(skjemaFeil).filter(feilmelding => feilmelding).length > 0) {
            setErrors(skjemaFeil);
            return;
        }
        sendDataTilBackend(skjema).then(() =>  {
            setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
            dispatch({view: ActionType.INNSENDING});
        }).catch (error => {
            console.log(error); // tslint:disable-line:no-console
        });
    }

    function handleLagreOgTilbake (e?: any) {
        e.preventDefault();
        const skjema: SkjemaData = {opplysninger: byggOpplysningliste(opplysninger), hovedmal, innsatsgruppe, begrunnelse, andreOpplysninger};
        sendDataTilBackend(skjema)
            .then(dispatchFetchVedtakOgRedirectTilHovedside)
            .catch (error => {
                console.log(error); // tslint:disable-line:no-console
            });
    }

    function handleSlett() {
        VedtaksstotteApi.slettUtkast(fnr)
            .then(dispatchFetchVedtakOgRedirectTilHovedside)
            .catch (error => {
                console.log(error); // tslint:disable-line:no-console
            });
    }

    function handleOpplysningerChanged (e: React.ChangeEvent<HTMLInputElement>) {
        setOpplysninger(prevState => {
            prevState[e.target.name as OpplysningType] = e.target.checked;
            return Object.assign({}, prevState);
        });
    }

    return (
        <div className="skjema">
            <div className="skjema__info">
                <TilbakeKnapp
                    tilbake={dispatchFetchVedtakOgRedirectTilHovedside}
                />
                {sistLagret && <EtikettInfo><Normaltekst>{`Sist lagret : ${sistLagret}`}</Normaltekst></EtikettInfo>}
            </div>
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
                    handleAndraOpplysningerChanged={handleAndreopplysninger}
                    andreOpplysninger={andreOpplysninger}
                    opplysningerfeil={errors.opplysninger}
                    opplysninger={opplysninger}
                />
                <Aksjoner
                    handleSubmit={handleSubmit}
                    handleLagreOgTilbake={handleLagreOgTilbake}
                    handleSlett={handleSlett}
                />
            </Card>
        </div>
    );
}

export default Skjema;
