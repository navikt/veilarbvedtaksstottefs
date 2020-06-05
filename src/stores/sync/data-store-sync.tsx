import { useEffect } from 'react';
import { useDataFetcherStore } from '../data-fetcher-store';
import { hasFinishedWithData } from '../../rest/utils';
import { useDataStore } from '../data-store';

export const DataStoreSync = () => {
	const {
		setVedtak, setMeldinger,
		setInnloggetVeileder,
		setArenaVedtak, setFeatures,
		setMalform, setOppfolgingData
	} = useDataStore();
	const {
		vedtakFetcher, meldingFetcher,
		innloggetVeilederFetcher, malformFetcher,
		arenaVedtakFetcher, oppfolgingDataFetcher, featuresFetcher
	} = useDataFetcherStore();

	useEffect(() => {
		if (hasFinishedWithData(meldingFetcher)) {
			setMeldinger(meldingFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [meldingFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(vedtakFetcher)) {
			setVedtak(vedtakFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vedtakFetcher.status]);

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
