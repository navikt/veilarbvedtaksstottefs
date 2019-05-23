import { skjemaIsNotEmpty, validerSkjema } from '../../components/skjema/skjema-utils';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useContext, useState } from 'react';
import { AppContext, ViewDispatch } from '../../components/app-provider/app-provider';
import { Status } from '../../utils/hooks/useFetch';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { useTimer } from '../../utils/hooks/useTimer';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import React from 'react';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import { OrNothing } from '../../utils/types/ornothing';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { Normaltekst } from 'nav-frontend-typografi';
import { VedtakData } from '../../utils/types/vedtak';
import Skjema from '../../components/skjema/skjema';

export interface SkjemaData {
    opplysninger: string[] | undefined;
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
}

interface SkjemaAksjonerProps {
    fnr: string;
}

const initialSkjemaData = {
    opplysninger: undefined,
    hovedmal: undefined,
    innsatsgruppe: undefined,
    begrunnelse: ''
};

export function Vedtakskjema ({fnr}: SkjemaAksjonerProps) {
    const {dispatch} = useContext(ViewDispatch);
    const {vedtak, setVedtak } = useContext(AppContext);
    const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST') || initialSkjemaData;
    const [sistLagret, setSistLagret] = useState('');
    const [errors, setErrors] = useState<SkjemaFeil>({});
    const [skjemaObjekt, setSkjema] = useState<SkjemaData>(utkast);

    useTimer(() => oppdaterSistEndret(skjemaObjekt), 2000, [skjemaObjekt]);

    function sendDataTilBackend (skjema: SkjemaData) {
        return VedtaksstotteApi.putVedtakUtkast(fnr, skjema);
    }

    function dispatchFetchVedtakOgRedirectTilHovedside () {
        setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
        dispatch({view: ActionType.HOVEDSIDE});
    }

    function handleLagreOgTilbake (e: any, skjema: SkjemaData) {
        e.preventDefault();
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

    function oppdaterSistEndret (skjema: SkjemaData) {
     if (skjemaIsNotEmpty(skjema)) {
            sendDataTilBackend(skjema).then(() => {
                const date = new Date();
                const dato = date.toISOString().slice(0, 10);
                const tid = date.toLocaleTimeString('no');
                setSistLagret(`${dato} ${tid}`);
            });
        }
    }

    function handleSubmit (e: any, skjema: SkjemaData ) {
        e.preventDefault();
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

    return (
        <form className="skjema" onSubmit={(e) => handleSubmit(e, skjemaObjekt)}>
            <div className="skjema__topp">
                <TilbakeKnapp tilbake={dispatchFetchVedtakOgRedirectTilHovedside}/>
                {sistLagret && <EtikettInfo><Normaltekst>{`Sist lagret : ${sistLagret}`}</Normaltekst></EtikettInfo>}
            </div>
            <Skjema
                utkast={skjemaObjekt}
                errors={errors}
                setSkjema={setSkjema}
            />
            <Aksjoner
                handleSubmit={(e) => handleSubmit(e, skjemaObjekt)}
                handleLagreOgTilbake={(e) => handleLagreOgTilbake(e, skjemaObjekt)}
                handleSlett={handleSlett}
            />
        </form>
    );
}