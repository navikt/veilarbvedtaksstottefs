import { useEffect } from 'react';
import { useDataFetcherStore } from '../data-fetcher-store';
import { hasFinishedWithData } from '../../rest/utils';
import { useDataStore } from '../data-store';

export const DataStoreSync = () => {
	const {
		setFattedeVedtak, setMeldinger,
		setInnloggetVeileder,
		setArenaVedtak, setFeatures,
		setMalform, setOppfolgingData,
		setUtkast
	} = useDataStore();
	const {
		fattedeVedtakFetcher, meldingFetcher,
		innloggetVeilederFetcher, malformFetcher,
		arenaVedtakFetcher, oppfolgingDataFetcher,
		featuresFetcher, utkastFetcher
	} = useDataFetcherStore();

	useEffect(() => {
		if (hasFinishedWithData(meldingFetcher)) {
			setMeldinger(meldingFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [meldingFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(fattedeVedtakFetcher)) {
			setFattedeVedtak(fattedeVedtakFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fattedeVedtakFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(utkastFetcher)) {
			setUtkast(utkastFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [utkastFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(innloggetVeilederFetcher)) {
			setInnloggetVeileder(innloggetVeilederFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innloggetVeilederFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(arenaVedtakFetcher)) {
			setArenaVedtak(arenaVedtakFetcher.data || []);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arenaVedtakFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(featuresFetcher)) {
			setFeatures(featuresFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [featuresFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(malformFetcher)) {
			setMalform(malformFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [malformFetcher.status]);


	useEffect(() => {
		if (hasFinishedWithData(oppfolgingDataFetcher)) {
			setOppfolgingData(oppfolgingDataFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [oppfolgingDataFetcher.status]);

    return null;
};
