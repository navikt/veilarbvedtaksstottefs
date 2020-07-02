import React, { useEffect, useState } from 'react';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import TilgangTilBrukersKontor from '../../utils/types/tilgang-til-brukers-kontor';
import { fetchTilgangTilKontor } from '../../rest/api';
import { FetchResponse } from '../../rest/utils';
import Spinner from '../spinner/spinner';

interface NasjonalTilgangSjekkProps {
	fnr: string;
	children?: any;
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {

	const [tilgangTilKontor, setTilgangTilKontor] = useState<FetchResponse<TilgangTilBrukersKontor> | null>();

	useEffect(() => {
		fetchTilgangTilKontor(props.fnr).then(setTilgangTilKontor);
	}, [props.fnr]);

	if (!tilgangTilKontor) {
		return <Spinner />;
	} else if (tilgangTilKontor.error || !tilgangTilKontor.data) {
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
