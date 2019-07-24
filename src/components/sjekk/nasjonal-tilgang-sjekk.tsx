import React, { useEffect } from 'react';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import TilgangTilBrukersKontor from '../../utils/types/tilgang-til-brukers-kontor';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch from '../../rest/use-fetch';
import { FnrFetchParams, lagHentTilgangTilKontorFetchInfo } from '../../rest/api';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../../rest/utils';

interface NasjonalTilgangSjekkProps {
    fnr: string;
    children?: any
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {
    const tilgangTilKontor = useFetch<TilgangTilBrukersKontor, FnrFetchParams>(lagHentTilgangTilKontorFetchInfo);

    useEffect(() => {
        if (isNotStarted(tilgangTilKontor)) {
            tilgangTilKontor.fetch({ fnr: props.fnr });
        }
    }, []);

    if (isAnyNotStartedOrPending(tilgangTilKontor)) {
        return <NavFrontendSpinner className="vedtaksstotte-spinner" type="XL"/>;
    } else if (hasAnyFailed(tilgangTilKontor)) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    if (!tilgangTilKontor.data.tilgangTilBrukersKontor) {
        return (
            <AlertStripeAdvarsel className="vedtaksstotte-alert">
                Du har ikke tilgang til å se brukers oppfølgingsvedtak.
            </AlertStripeAdvarsel>
        );
    }

    return props.children;
}
