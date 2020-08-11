import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { hasAnyFailed, hasData, isAnyNotStartedOrPending, useFetchResponsePromise, } from '../rest/utils';
import Spinner from './spinner/spinner';
import { fetchArenaVedtak, fetchFattedeVedtak, fetchInnloggetVeileder, fetchMalform, fetchOppfolging, fetchUtkast } from '../rest/api';
import { useDataStore } from '../stores/data-store';
import { ArenaVedtak, Vedtak } from '../rest/data/vedtak';
import OppfolgingData from '../rest/data/oppfolging-data';
import { MalformData } from '../rest/data/malform';
import { Veileder } from '../rest/data/veiledere';

export function DataFetcher(props: { fnr: string; children: any }) {
    const fattedeVedtakPromise = useFetchResponsePromise<Vedtak[]>();
    const oppfolgingDataPromise = useFetchResponsePromise<OppfolgingData>();
    const malformDataPromise = useFetchResponsePromise<MalformData>();
    const utkastPromise = useFetchResponsePromise<Vedtak>();
    const innloggetVeilederPromise = useFetchResponsePromise<Veileder>();
    const arenaVedtakPromise = useFetchResponsePromise<ArenaVedtak[]>();

    const fetchResponsePromises = [
        fattedeVedtakPromise,
        oppfolgingDataPromise,
        malformDataPromise,
        utkastPromise,
        innloggetVeilederPromise,
        arenaVedtakPromise
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
        fattedeVedtakPromise.evaluate(fetchFattedeVedtak(props.fnr));
        oppfolgingDataPromise.evaluate(fetchOppfolging(props.fnr));
        malformDataPromise.evaluate(fetchMalform(props.fnr));
        utkastPromise.evaluate(fetchUtkast(props.fnr));
        innloggetVeilederPromise.evaluate(fetchInnloggetVeileder());
        arenaVedtakPromise.evaluate(fetchArenaVedtak(props.fnr));
        // eslint-disable-next-line
    }, [props.fnr]);

    useEffect(() => {
        if (hasData(fattedeVedtakPromise)) {
            setFattedeVedtak(fattedeVedtakPromise.data);
        }
        if (hasData(oppfolgingDataPromise)) {
            setOppfolgingData(oppfolgingDataPromise.data);
        }
        if (hasData(malformDataPromise)) {
            setMalform(malformDataPromise.data);
        }
        if (hasData(utkastPromise)) {
            setUtkast(utkastPromise.data);
        }
        if (hasData(innloggetVeilederPromise)) {
            setInnloggetVeileder(innloggetVeilederPromise.data);
        }
        if (hasData(arenaVedtakPromise)) {
            setArenaVedtak(arenaVedtakPromise.data);
        }
    // eslint-disable-next-line
    }, fetchResponsePromises);

    if (isAnyNotStartedOrPending(fetchResponsePromises)) {
        return <Spinner/>;
    } else if (hasAnyFailed(fetchResponsePromises)) {
        return (
            <AlertStripeFeil className="vedtaksstotte-alert">
                Det oppnås for tiden ikke kontakt med alle baksystemer.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    return props.children;
}
