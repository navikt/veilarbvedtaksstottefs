import { useEffect, type JSX } from 'react';
import Spinner from './spinner/spinner';
import { useDataStore } from '../store/data-store';
import { useSkjemaStore } from '../store/skjema-store';
import { finnVeilederTilgang } from '../util/tilgang';
import { useTilgangStore } from '../store/tilgang-store';
import { useAxiosFetcher } from '../util/use-axios-fetcher';
import { hentArenaVedtak, hentFattedeVedtak } from '../api/veilarbvedtaksstotte/vedtak';
import { fetchOppfolging } from '../api/veilarboppfolging';
import { fetchAktivArbeidssokerperiode, fetchMalform, fetchNavn } from '../api/veilarbperson';
import { fetchUtkast } from '../api/veilarbvedtaksstotte/utkast';
import { fetchInnloggetVeileder } from '../api/veilarbveileder';
import { ifResponseHasData, hasAnyFailed, isAnyLoading } from '../api/utils';
import { IkkeKontaktMedBaksystemFeilmelding } from './feilmelding/ikke-kontakt-med-baksystem-feilmelding';

export function DataFetcher(props: { fnr: string; children: React.ReactNode }): JSX.Element | null {
	const { initSkjema } = useSkjemaStore();
	const {
		setFattedeVedtak,
		setOppfolgingData,
		setMalform,
		setUtkast,
		setInnloggetVeileder,
		setArenaVedtak,
		setNavn,
		setArbeidssokerperiode
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			utkastFetcher
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
		)
	) {
		return <IkkeKontaktMedBaksystemFeilmelding />;
	}

	return <>{props.children}</>;
}
