import { useEffect } from 'react';
import Spinner from './spinner/spinner';
import { useDataStore } from '../store/data-store';
import { useSkjemaStore } from '../store/skjema-store';
import { finnVeilederTilgang } from '../util/tilgang';
import { useTilgangStore } from '../store/tilgang-store';
import { useAxiosFetcher } from '../util/use-axios-fetcher';
import { hentArenaVedtak, hentFattedeVedtak } from '../api/veilarbvedtaksstotte/vedtak';
import { fetchOppfolging } from '../api/veilarboppfolging';
import { fetchAktivArbeidssokerperiode, fetchCv, fetchMalform, fetchNavn } from '../api/veilarbperson';
import { fetchUtkast } from '../api/veilarbvedtaksstotte/utkast';
import { fetchInnloggetVeileder } from '../api/veilarbveileder';
import { ifResponseHasData, hasAnyFailed, isAnyLoading } from '../api/utils';
import { IkkeKontaktMedBaksystemFeilmelding } from './feilmelding/ikke-kontakt-med-baksystem-feilmelding';

export function DataFetcher(props: { fnr: string; children: any }) {
	const { initSkjema } = useSkjemaStore();
	const {
		setFattedeVedtak,
		setOppfolgingData,
		setMalform,
		setUtkast,
		setInnloggetVeileder,
		setArenaVedtak,
		setNavn,
		setArbeidssokerperiode,
		setCvSomKilde
	} = useDataStore();
	const { setVeilederTilgang } = useTilgangStore();

	const fattedeVedtakFetcher = useAxiosFetcher(hentFattedeVedtak);
	const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
	const malformFetcher = useAxiosFetcher(fetchMalform);
	const utkastFetcher = useAxiosFetcher(fetchUtkast);
	const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
	const arenaVedtakFetcher = useAxiosFetcher(hentArenaVedtak);
	const navnFetcher = useAxiosFetcher(fetchNavn);
	const arbeidssoekerperiodeFetcher = useAxiosFetcher(fetchAktivArbeidssokerperiode);
	const cvFetcher = useAxiosFetcher(fetchCv);

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

		navnFetcher.fetch(props.fnr).then(ifResponseHasData(setNavn)).catch();

		arbeidssoekerperiodeFetcher.fetch(props.fnr).then(ifResponseHasData(setArbeidssokerperiode)).catch();

		/* eslint-disable no-console */
		cvFetcher
			.fetch(props.fnr)
			.then(response => {
				if (response.status === 200 && response.data) {
					console.log('CV funnet og kan brukes som kilde 200');
					setCvSomKilde({ cvKanBrukesSomKilde: true, begrunnelse: undefined });
				}
			})
			.catch(error => {
				if (error.status === 404) {
					console.log('CV ikke funnet 204 eller 404: ', error.status);
					setCvSomKilde({ cvKanBrukesSomKilde: false, begrunnelse: 'ingen CV funnet' });
				} else if (error.status === 403) {
					console.log('CV forbidden 403: ', error.status);
					setCvSomKilde({
						cvKanBrukesSomKilde: false,
						begrunnelse: 'manglende tilgang på bruker, eller at bruker har ikke delt CVen.'
					});
				} else {
					console.error('Feil ved henting av CV: ', error);
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	/* eslint-enable no-console */

	useEffect(() => {
		if (innloggetVeilederFetcher.data && !utkastFetcher.loading) {
			setVeilederTilgang(finnVeilederTilgang(innloggetVeilederFetcher.data, utkastFetcher.data));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innloggetVeilederFetcher, utkastFetcher]);

	if (
		isAnyLoading(
			fattedeVedtakFetcher,
			oppfolgingFetcher,
			malformFetcher,
			innloggetVeilederFetcher,
			arenaVedtakFetcher,
			navnFetcher,
			utkastFetcher,
			cvFetcher
		)
	) {
		return <Spinner />;
	} else if (
		hasAnyFailed(
			fattedeVedtakFetcher,
			oppfolgingFetcher,
			malformFetcher,
			innloggetVeilederFetcher,
			arenaVedtakFetcher,
			navnFetcher,
			utkastFetcher
		) ||
		(cvFetcher.error?.status && ![403, 404].includes(cvFetcher.error.status))
	) {
		return <IkkeKontaktMedBaksystemFeilmelding />;
	}

	return props.children;
}
