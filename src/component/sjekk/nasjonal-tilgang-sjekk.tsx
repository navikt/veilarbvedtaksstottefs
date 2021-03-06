import React, { useLayoutEffect } from 'react';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from '../spinner/spinner';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { fetchTilgangTilBrukersKontor } from '../../api/veilarboppfolging';

interface NasjonalTilgangSjekkProps {
	fnr: string;
	children?: any;
}

export function NasjonalTilgangSjekk(props: NasjonalTilgangSjekkProps) {
	const tilgangTilKontorFetcher = useAxiosFetcher(fetchTilgangTilBrukersKontor);

	// Siden loading = false før vi kaller fetch så vil advarsel alertstripen bli rendret et par ms med useEffect()
	useLayoutEffect(() => {
		tilgangTilKontorFetcher.fetch(props.fnr).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (tilgangTilKontorFetcher.loading) {
		return <Spinner />;
	} else if (tilgangTilKontorFetcher.error) {
		return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
	} else if (!tilgangTilKontorFetcher.data?.tilgangTilBrukersKontor) {
		return (
			<AlertStripeAdvarsel className="vedtaksstotte-alert">
				Du har ikke tilgang til å se brukers oppfølgingsvedtak.
			</AlertStripeAdvarsel>
		);
	}

	return props.children;
}
