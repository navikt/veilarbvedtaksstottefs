import React, { ReactNode } from 'react';
import { useFetch } from '../../utils/hooks/useFetch';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import OppfolgingApi from '../../api/oppfolging-api';
import TilgangTilBrukersKontor from '../../utils/types/tilgang-til-brukers-kontor';
import { isAnyFailed, isAnyLoading } from '../../utils/fetch-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface NasjonalTilgangSjekkProps {
    fnr: string;
    children?: ReactNode
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {
    const tilgangTilKontor = useFetch<TilgangTilBrukersKontor>(OppfolgingApi.lagHentTilgangTilBrukersKontor(props.fnr));

    if (isAnyLoading(tilgangTilKontor.status)) {
        return <NavFrontendSpinner className="vedtaksstotte-spinner" type="XL"/>;
    } else if (isAnyFailed(tilgangTilKontor.status)) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    if (!tilgangTilKontor.data.tilgangTilBrukersKontor) {
        return (
            <AlertStripeAdvarsel className="vedtaksstotte-alert">
                Du har ikke tilgang til å se brukers oppfølgingsvedtak.
            </AlertStripeAdvarsel>
        );
    }

    return props.children as any;
}
