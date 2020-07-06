import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { hasAnyFailed, isAnyNotStartedOrPending, Status, useFetchResponsePromise, } from '../rest/utils';
import Spinner from './spinner/spinner';
import { fetchArenaVedtak, fetchFattedeVedtak, fetchInnloggetVeileder, fetchMalform, fetchOppfolging, fetchUtkast } from '../rest/api';
import { useDataStore } from '../stores/data-store';
import { ArenaVedtak, Vedtak } from '../rest/data/vedtak';
import OppfolgingData from '../rest/data/oppfolging-data';
import { MalformData } from '../rest/data/malform';
import { Veileder } from '../rest/data/veiledere';

export function DataFetcher(props: { fnr: string; children: any }) {
    const [fattedeVedtakState, evaluateFattedeVedtak] = useFetchResponsePromise<Vedtak[]>();
    const [oppfolgingDataState, evaluateOppfolgingData] = useFetchResponsePromise<OppfolgingData>();
    const [malformDataState, evaluateMalformData] = useFetchResponsePromise<MalformData>();
    const [utkastState, evaluateUtkast] = useFetchResponsePromise<Vedtak>();
    const [innloggetVeilederState, evaluateInnloggetVeileder] = useFetchResponsePromise<Veileder>();
    const [arenaVedtakState, evaluateArenaVedtak] = useFetchResponsePromise<ArenaVedtak[]>();

    const fetchResponseStates = [
        fattedeVedtakState,
        oppfolgingDataState,
        malformDataState,
        utkastState,
        innloggetVeilederState,
        arenaVedtakState
    ];

    const {
        setFattedeVedtak,
        setOppfolgingData,
        setMalform,
        setUtkast,
        setInnloggetVeileder,
        setArenaVedtak,
    } = useDataStore();

    useEffect(() => {
        evaluateFattedeVedtak(fetchFattedeVedtak(props.fnr));
        evaluateOppfolgingData(fetchOppfolging(props.fnr));
        evaluateMalformData(fetchMalform(props.fnr));
        evaluateUtkast(fetchUtkast(props.fnr));
        evaluateInnloggetVeileder(fetchInnloggetVeileder());
        evaluateArenaVedtak(fetchArenaVedtak(props.fnr));
        // eslint-disable-next-line
    }, [props.fnr]);

    useEffect(() => {
        if (fattedeVedtakState.status === Status.SUCCEEDED_WITH_DATA) {
            setFattedeVedtak(fattedeVedtakState.data);
        }
        if (oppfolgingDataState.status === Status.SUCCEEDED_WITH_DATA) {
            setOppfolgingData(oppfolgingDataState.data);
        }
        if (malformDataState.status === Status.SUCCEEDED_WITH_DATA) {
            setMalform(malformDataState.data);
        }
        if (utkastState.status === Status.SUCCEEDED_WITH_DATA) {
            setUtkast(utkastState.data);
        }
        if (innloggetVeilederState.status === Status.SUCCEEDED_WITH_DATA) {
            setInnloggetVeileder(innloggetVeilederState.data);
        }
        if (arenaVedtakState.status === Status.SUCCEEDED_WITH_DATA) {
            setArenaVedtak(arenaVedtakState.data);
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
