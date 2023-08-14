import { useEffect } from 'react';
import Spinner from './spinner/spinner';
import { useDataStore } from '../store/data-store';
import { useSkjemaStore } from '../store/skjema-store';
import { finnVeilederTilgang } from '../util/tilgang';
import { useTilgangStore } from '../store/tilgang-store';
import { useAxiosFetcher } from '../util/use-axios-fetcher';
import { hentArenaVedtak, hentFattedeVedtak } from '../api/veilarbvedtaksstotte/vedtak';
import { fetchOppfolging } from '../api/veilarboppfolging';
import { fetchMalform } from '../api/veilarbperson';
import { fetchUtkast } from '../api/veilarbvedtaksstotte/utkast';
import { fetchInnloggetVeileder } from '../api/veilarbveileder';
import { ifResponseHasData, hasAnyFailed, isAnyLoadingOrNotStarted } from '../api/utils';
import { Alert } from '@navikt/ds-react';

export function DataFetcher(props: { fnr: string; children: any }) {
	const { initSkjema } = useSkjemaStore();
	const { setFattedeVedtak, setOppfolgingData, setMalform, setUtkast, setInnloggetVeileder, setArenaVedtak } =
		useDataStore();
	const { setVeilederTilgang } = useTilgangStore();

	const fattedeVedtakFetcher = useAxiosFetcher(hentFattedeVedtak);
	const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
	const malformFetcher = useAxiosFetcher(fetchMalform);
	const utkastFetcher = useAxiosFetcher(fetchUtkast);
	const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
	const arenaVedtakFetcher = useAxiosFetcher(hentArenaVedtak);

	useEffect(() => {
		fattedeVedtakFetcher.fetch(props.fnr).then(ifResponseHasData(setFattedeVedtak)).catch();

		oppfolgingFetcher.fetch(props.fnr).then(ifResponseHasData(setOppfolgingData)).catch();

		malformFetcher.fetch(props.fnr).then(ifResponseHasData(setMalform)).catch();

		utkastFetcher
			.fetch(props.fnr)
			.then(
				ifResponseHasData(utkast => {
					setUtkast(utkast);
					initSkjema(utkast);
				})
			)
			.catch();

		innloggetVeilederFetcher.fetch().then(ifResponseHasData(setInnloggetVeileder)).catch();

		arenaVedtakFetcher.fetch(props.fnr).then(ifResponseHasData(setArenaVedtak)).catch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (innloggetVeilederFetcher.data && !utkastFetcher.loading) {
			setVeilederTilgang(finnVeilederTilgang(innloggetVeilederFetcher.data, utkastFetcher.data));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innloggetVeilederFetcher, utkastFetcher]);

	if (
		isAnyLoadingOrNotStarted(
			fattedeVedtakFetcher,
			oppfolgingFetcher,
			malformFetcher,
			utkastFetcher,
			innloggetVeilederFetcher,
			arenaVedtakFetcher
		)
	) {
		return <Spinner />;
	} else if (
		hasAnyFailed(
			fattedeVedtakFetcher,
			oppfolgingFetcher,
			malformFetcher,
			innloggetVeilederFetcher,
			arenaVedtakFetcher
		) ||
		(utkastFetcher.error && utkastFetcher.error.response?.status !== 404) // API gir 404 dersom utkast ikke eksisterer
	) {
		return (
			<Alert variant="error" className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
	}

	return props.children;
}
