import React, { useEffect } from 'react';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import TilgangTilBrukersKontor from '../../utils/types/tilgang-til-brukers-kontor';
import { fetchTilgangTilKontor } from '../../rest/api';
import { hasData, hasFailed, isNotStartedOrPending, useFetchResponsPromise } from '../../rest/utils';
import Spinner from '../spinner/spinner';

interface NasjonalTilgangSjekkProps {
	fnr: string;
	children?: any;
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {

	const tilgangTilKontor = useFetchResponsPromise<TilgangTilBrukersKontor>();

	useEffect(() => {
		tilgangTilKontor.evaluate(fetchTilgangTilKontor(props.fnr));
	}, [props.fnr]);

	if (isNotStartedOrPending(tilgangTilKontor)) {
		return <Spinner />;
	} else if (hasFailed(tilgangTilKontor) || !hasData(tilgangTilKontor)) {
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
