import { useLayoutEffect } from 'react';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { fetchTilgangTilBrukersKontor } from '../../api/veilarboppfolging';
import Spinner from '../spinner/spinner';
import { Alert } from '@navikt/ds-react';

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
		return <Alert variant="error">Noe gikk galt, prøv igjen</Alert>;
	} else if (!tilgangTilKontorFetcher.data?.tilgangTilBrukersKontor) {
		return <Alert variant="warning">Du har ikke tilgang til å se brukers oppfølgingsvedtak.</Alert>;
	}

	return props.children;
}
