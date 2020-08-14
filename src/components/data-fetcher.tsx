import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { hasAnyFailed, isAnyNotStartedOrPending, } from '../rest/utils';
import Spinner from './spinner/spinner';
import { useFetchArenaVedtak, useFetchFattedeVedtak, useFetchInnloggetVeileder, useFetchMalform, useFetchOppfolging, useFetchUtkast } from '../rest/api';
import { useDataStore } from '../stores/data-store';
import { useSkjemaStore } from '../stores/skjema-store';
import { finnVeilederTilgang } from '../utils/tilgang';
import { useTilgangStore } from '../stores/tilgang-store';

export function DataFetcher(props: { fnr: string; children: any }) {
    const {initSkjema} = useSkjemaStore();
    const {
        setFattedeVedtak,
        setOppfolgingData,
        setMalform,
        setUtkast,
        setInnloggetVeileder,
        setArenaVedtak,
    } = useDataStore();
    const { setVeilederTilgang } = useTilgangStore();

    const fattedeVedtakState = useFetchFattedeVedtak(props.fnr);
    const oppfolgingDataState = useFetchOppfolging(props.fnr);
    const malformDataState = useFetchMalform(props.fnr);
    const utkastState = useFetchUtkast(props.fnr);
    const innloggetVeilederState = useFetchInnloggetVeileder();
    const arenaVedtakState = useFetchArenaVedtak(props.fnr);

    const fetchResponseStates = [
        fattedeVedtakState,
        oppfolgingDataState,
        malformDataState,
        utkastState,
        innloggetVeilederState,
        arenaVedtakState
    ];


    useEffect(() => {
        if (fattedeVedtakState.data) {
            setFattedeVedtak(fattedeVedtakState.data);
        }
        if (oppfolgingDataState.data) {
            setOppfolgingData(oppfolgingDataState.data);
        }
        if (malformDataState.data) {
            setMalform(malformDataState.data);
        }
        if (utkastState.data) {
            setUtkast(utkastState.data);
            initSkjema(utkastState.data);
        }
        if (innloggetVeilederState.data) {
            setInnloggetVeileder(innloggetVeilederState.data);
        }
        if (arenaVedtakState.data) {
            setArenaVedtak(arenaVedtakState.data);
        }
        if(innloggetVeilederState.data && !utkastState.isLoading) {
            setVeilederTilgang(finnVeilederTilgang(innloggetVeilederState.data, utkastState.data));
        }
    // eslint-disable-next-line
    }, fetchResponseStates);

    if (isAnyNotStartedOrPending(fetchResponseStates)) {
        return <Spinner/>;
    } else if (hasAnyFailed(fetchResponseStates)) {
        return (
            <AlertStripeFeil className="vedtaksstotte-alert">
                Det oppnås for tiden ikke kontakt med alle baksystemer.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    return props.children;
}
