import React from 'react';
import { useGlobalFetch } from '../utils/hooks/useFetch';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeilSolid } from 'nav-frontend-alertstriper';
import VedtaksstotteApi from '../api/vedtaksstotte-api';
import OppfolgingApi from '../api/oppfolging-api';
import { isAnyFailed, isAnyLoading } from '../utils/fetch-utils';

export function DataFetcher (props: {fnr: string, children: any}) {
    const vedtakData = useGlobalFetch(VedtaksstotteApi.lagHentVedtakConfig(props.fnr), 'vedtak');
    const underOppfolging = useGlobalFetch(OppfolgingApi.lagUnderOppfolgingConfig(props.fnr), 'underOppfolging');

    console.log(vedtakData); // tslint:disable-line
    console.log(underOppfolging); // tslint:disable-line

    if (isAnyLoading(vedtakData.status, underOppfolging.status)) {
        return <NavFrontendSpinner type="XL"/>;
    } else if (isAnyFailed(vedtakData.status, underOppfolging.status)) {
        return <AlertStripeFeilSolid>Noe gikk galt, prøv igjen</AlertStripeFeilSolid>;
    }

    return props.children;
}
