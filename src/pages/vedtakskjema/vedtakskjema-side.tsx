import { mapTilTekstliste, skjemaIsNotEmpty, validerSkjema } from '../../components/skjema/skjema-utils';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useContext, useState } from 'react';
import { AppContext, ViewDispatch } from '../../components/providers/app-provider';
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
import Skjema from '../../components/skjema/skjema';
import { SkjemaContext } from '../../components/providers/skjema-provider';

export interface SkjemaData {
    opplysninger: string[] | undefined;
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
}

interface SkjemaAksjonerProps {
    fnr: string;
}

export function VedtakskjemaSide ({fnr}: SkjemaAksjonerProps) {
    const {dispatch} = useContext(ViewDispatch);
    const {setVedtak} = useContext(AppContext);
    const {opplysninger, begrunnelse, innsatsgruppe, hovedmal, sistOppdatert, setSistOppdatert} = useContext(SkjemaContext);
    const [errors, setErrors] = useState<SkjemaFeil>({});

    const vedtakskjema = {opplysninger: mapTilTekstliste(opplysninger), begrunnelse, innsatsgruppe, hovedmal};

    useTimer(() => oppdaterSistEndret(vedtakskjema), 2000, [vedtakskjema]);

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
                setSistOppdatert(`${dato} ${tid}`);
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
        <form className="skjema" onSubmit={(e) => handleSubmit(e, vedtakskjema)}>
            <div className="skjema__topp">
                <TilbakeKnapp tilbake={dispatchFetchVedtakOgRedirectTilHovedside}/>
                {sistOppdatert && <EtikettInfo><Normaltekst>{`Sist lagret : ${sistOppdatert}`}</Normaltekst></EtikettInfo>}
            </div>
            <Skjema errors={errors}/>
            <Aksjoner
                handleSubmit={(e) => handleSubmit(e, vedtakskjema)}
                handleLagreOgTilbake={(e) => handleLagreOgTilbake(e, vedtakskjema)}
                handleSlett={handleSlett}
            />
        </form>
    );
}