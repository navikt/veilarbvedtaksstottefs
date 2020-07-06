import React, { useEffect } from 'react';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import TilgangTilBrukersKontor from '../../utils/types/tilgang-til-brukers-kontor';
import { fetchTilgangTilKontor } from '../../rest/api';
import { Status, useFetchResponsePromise } from '../../rest/utils';
import Spinner from '../spinner/spinner';

interface NasjonalTilgangSjekkProps {
    fnr: string;
    children?: any;
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {

    const [tilgangTilKontorState, evaluateTilgangTilKontor] = useFetchResponsePromise<TilgangTilBrukersKontor>();

    useEffect(() => {
        evaluateTilgangTilKontor(fetchTilgangTilKontor(props.fnr));
        // eslint-disable-next-line
    }, [props.fnr]);

    switch (tilgangTilKontorState.status) {
        case Status.NOT_STARTED:
        case Status.PENDING:

            return <Spinner/>;

        case Status.SUCCEEDED_WITH_DATA:

            if (tilgangTilKontorState.data.tilgangTilBrukersKontor) {
                return props.children;
            } else {
                return (
                    <AlertStripeAdvarsel className="vedtaksstotte-alert">
                        Du har ikke tilgang til å se brukers oppfølgingsvedtak.
                    </AlertStripeAdvarsel>
                );
            }

        default:

            return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }
}
