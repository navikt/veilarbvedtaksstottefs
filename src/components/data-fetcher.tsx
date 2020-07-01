import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { hasAnyFailed2, hasData2, isAnyNotStartedOrPending2, useFetchResonsPromise, } from '../rest/utils';
import Spinner from './spinner/spinner';
import { fetchArenaVedtak, fetchFattedeVedtak, fetchFeatures, fetchInnloggetVeileder, fetchMalform, fetchOppfolging, fetchUtkast } from '../rest/api';
import { useDataStore } from '../stores/data-store';
import { ArenaVedtak, Vedtak } from '../rest/data/vedtak';
import OppfolgingData from '../rest/data/oppfolging-data';
import { Features } from '../rest/data/features';
import { MalformData } from '../rest/data/malform';
import { Veileder } from '../rest/data/veiledere';

export function DataFetcher(props: { fnr: string; children: any }) {
    const fattedeVedtakPromise = useFetchResonsPromise<Vedtak[]>();
    const oppfolgingDataPromise = useFetchResonsPromise<OppfolgingData>();
    const featuresPromise = useFetchResonsPromise<Features>();
    const malformDataPromise = useFetchResonsPromise<MalformData>();
    const utkastPromise = useFetchResonsPromise<Vedtak>();
    const innloggetVeilederPromise = useFetchResonsPromise<Veileder>();
    const arenaVedtakPromise = useFetchResonsPromise<ArenaVedtak[]>();

    const fetchResponsePromises = [
        fattedeVedtakPromise,
        oppfolgingDataPromise,
        featuresPromise,
        malformDataPromise,
        utkastPromise,
        innloggetVeilederPromise,
        arenaVedtakPromise
    ];

    const {
        setFattedeVedtak,
        setOppfolgingData,
        features, setFeatures, isFeaturesHentet,
        setMalform,
        setUtkast,
        setInnloggetVeileder,
        setArenaVedtak,
    } = useDataStore();

    useEffect(() => {
        fattedeVedtakPromise.evaluate(fetchFattedeVedtak(props.fnr));
        oppfolgingDataPromise.evaluate(fetchOppfolging(props.fnr));
        if (isFeaturesHentet()) {
            featuresPromise.resolve(features)
        } else {
            featuresPromise.evaluate(fetchFeatures());
        }
        malformDataPromise.evaluate(fetchMalform(props.fnr));
        utkastPromise.evaluate(fetchUtkast(props.fnr));
        innloggetVeilederPromise.evaluate(fetchInnloggetVeileder());
        arenaVedtakPromise.evaluate(fetchArenaVedtak(props.fnr));
    }, [props.fnr]);

    useEffect(() => {
        if (hasData2(fattedeVedtakPromise)) {
            setFattedeVedtak(fattedeVedtakPromise.data);
        }
        if (hasData2(oppfolgingDataPromise)) {
            setOppfolgingData(oppfolgingDataPromise.data);
        }
        if (hasData2(featuresPromise)) {
            setFeatures(featuresPromise.data);
        }
        if (hasData2(malformDataPromise)) {
            setMalform(malformDataPromise.data);
        }
        if (hasData2(utkastPromise)) {
            setUtkast(utkastPromise.data);
        }
        if (hasData2(innloggetVeilederPromise)) {
            setInnloggetVeileder(innloggetVeilederPromise.data);
        }
        if (hasData2(arenaVedtakPromise)) {
            setArenaVedtak(arenaVedtakPromise.data);
        }

    }, fetchResponsePromises);

    if (isAnyNotStartedOrPending2(fetchResponsePromises)) {
        return <Spinner/>;
    } else if (hasAnyFailed2(fetchResponsePromises)) {
        return (
            <AlertStripeFeil className="vedtaksstotte-alert">
                Det oppnås for tiden ikke kontakt med alle baksystemer.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    return props.children;
}