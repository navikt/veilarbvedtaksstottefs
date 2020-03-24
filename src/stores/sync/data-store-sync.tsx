import React, { useEffect } from 'react';
import { useDataFetcherStore } from '../data-fetcher-store';
import { hasFinishedWithData } from '../../rest/utils';
import { useDataStore } from '../data-store';

export const DataStoreSync = () => {
	const {
		setVedtak, setDialogMeldinger,
		setInnloggetVeileder,
		setArenaVedtak, setFeatures,
		setMalform, setOppfolgingData
	} = useDataStore();
	const {
		vedtakFetcher, dialogerMeldingerFetcher,
		innloggetVeilederFetcher, malformFetcher,
		arenaVedtakFetcher, oppfolgingDataFetcher, featuresFetcher
	} = useDataFetcherStore();

	useEffect(() => {
		if (hasFinishedWithData(dialogerMeldingerFetcher)) {
			setDialogMeldinger(dialogerMeldingerFetcher.data);
		}
	}, [dialogerMeldingerFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(vedtakFetcher)) {
			setVedtak(vedtakFetcher.data);
		}
	}, [vedtakFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(innloggetVeilederFetcher)) {
			setInnloggetVeileder(innloggetVeilederFetcher.data);
		}
	}, [innloggetVeilederFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(arenaVedtakFetcher)) {
			setArenaVedtak(arenaVedtakFetcher.data || []);
		}
	}, [arenaVedtakFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(featuresFetcher)) {
			setFeatures(featuresFetcher.data);
		}
	}, [featuresFetcher.status]);

	useEffect(() => {
		if (hasFinishedWithData(malformFetcher)) {
			setMalform(malformFetcher.data);
		}
	}, [malformFetcher.status]);


	useEffect(() => {
		if (hasFinishedWithData(oppfolgingDataFetcher)) {
			setOppfolgingData(oppfolgingDataFetcher.data);
		}
	}, [oppfolgingDataFetcher.status]);

    return null;
};
