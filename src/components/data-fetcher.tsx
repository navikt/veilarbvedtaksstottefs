import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { hasAnyFailed, isAnyNotStartedOrPending, } from '../rest/utils';
import Spinner from './spinner/spinner';
import { useFetchArenaVedtak, useFetchFattedeVedtak, useFetchInnloggetVeileder, useFetchMalform, useFetchOppfolging, useFetchUtkast } from '../rest/api';
import { useDataStore } from '../stores/data-store';

export function DataFetcher(props: { fnr: string; children: any }) {
    const fattedeVedtakPromise = useFetchFattedeVedtak(props.fnr);
    const oppfolgingDataPromise = useFetchOppfolging(props.fnr);
    const malformDataPromise = useFetchMalform(props.fnr);
    const utkastPromise = useFetchUtkast(props.fnr);
    const innloggetVeilederPromise = useFetchInnloggetVeileder();
    const arenaVedtakPromise = useFetchArenaVedtak(props.fnr);

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
        if (fattedeVedtakPromise.data) {
            setFattedeVedtak(fattedeVedtakPromise.data);
        }
        if (oppfolgingDataPromise.data) {
            setOppfolgingData(oppfolgingDataPromise.data);
        }
        if (malformDataPromise.data) {
            setMalform(malformDataPromise.data);
        }
        if (utkastPromise.data) {
            setUtkast(utkastPromise.data);
        }
        if (innloggetVeilederPromise.data) {
            setInnloggetVeileder(innloggetVeilederPromise.data);
        }
        if (arenaVedtakPromise.data) {
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
