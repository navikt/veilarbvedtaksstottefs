import React from 'react';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useFetchTilgangTilKontor } from '../../rest/api';
import Spinner from '../spinner/spinner';

interface NasjonalTilgangSjekkProps {
    fnr: string;
    children?: any;
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {

    const tilgangTilKontor = useFetchTilgangTilKontor(props.fnr);

    if (tilgangTilKontor.isLoading) {
        return <Spinner/>;
    } else if (tilgangTilKontor.error) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    if (!tilgangTilKontor.data || !tilgangTilKontor.data.tilgangTilBrukersKontor) {
        return (
            <AlertStripeAdvarsel className="vedtaksstotte-alert">
                Du har ikke tilgang til å se brukers oppfølgingsvedtak.
            </AlertStripeAdvarsel>
        );
    }

    return props.children;
}
