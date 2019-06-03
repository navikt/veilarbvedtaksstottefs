import React, { useEffect } from 'react';
import { fetchData, useGlobalFetch } from '../utils/hooks/useFetch';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import VedtaksstotteApi from '../api/vedtaksstotte-api';
import OppfolgingApi from '../api/oppfolging-api';
import { isAnyFailed, isAnyLoading, Status } from '../utils/fetch-utils';
import { useFetchState } from './providers/fetch-provider';
import FeatureToggleApi from '../api/feature-toggle-api';

export function DataFetcher (props: {fnr: string, children: any}) {
    const underOppfolging = useGlobalFetch(OppfolgingApi.lagUnderOppfolgingConfig(props.fnr), 'underOppfolging');
    const features = useGlobalFetch(FeatureToggleApi.lagHentFeaturesConfig(), 'features');
    const [vedtak, setVedtak] = useFetchState('vedtak');

    useEffect(() => {
        if (vedtak.status === Status.NOT_STARTED) {
            fetchData(VedtaksstotteApi.lagHentVedtakConfig(props.fnr), setVedtak);
        }
    }, [vedtak.status]);

    if (isAnyLoading(vedtak.status, underOppfolging.status, features.status)) {
        return <NavFrontendSpinner className="vedtaksstotte-spinner" type="XL"/>;
    } else if (isAnyFailed(vedtak.status, underOppfolging.status, features.status)) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    return props.children;
}
