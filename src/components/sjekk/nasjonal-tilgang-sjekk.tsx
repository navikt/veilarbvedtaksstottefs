import React, { useEffect } from 'react';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import TilgangTilBrukersKontor from '../../utils/types/tilgang-til-brukers-kontor';
import { fetchTilgangTilKontor } from '../../rest/api';
import { hasData, hasFailed, isNotStartedOrPending, useFetchResponsePromise } from '../../rest/utils';
import Spinner from '../spinner/spinner';

interface NasjonalTilgangSjekkProps {
    fnr: string;
    children?: any;
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {

    const tilgangTilKontorPromise = useFetchResponsePromise<TilgangTilBrukersKontor>();

    useEffect(() => {
        tilgangTilKontorPromise.evaluate(fetchTilgangTilKontor(props.fnr));
        // eslint-disable-next-line
    }, [props.fnr]);

    if (isNotStartedOrPending(tilgangTilKontorPromise)) {
        return <Spinner/>;
    } else if (hasFailed(tilgangTilKontorPromise) || !hasData(tilgangTilKontorPromise)) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    if (!tilgangTilKontorPromise.data.tilgangTilBrukersKontor) {
        return (
            <AlertStripeAdvarsel className="vedtaksstotte-alert">
                Du har ikke tilgang til å se brukers oppfølgingsvedtak.
            </AlertStripeAdvarsel>
        );
    }

    return props.children;
}
