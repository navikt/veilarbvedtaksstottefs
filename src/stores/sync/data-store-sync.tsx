import { useEffect } from 'react';
import { useDataFetcherStore } from '../data-fetcher-store';
import { hasFinishedWithData } from '../../rest/utils';
import { useDataStore } from '../data-store';

export const DataStoreSync = () => {
	const {setMeldinger} = useDataStore();
	const {meldingFetcher} = useDataFetcherStore();

	useEffect(() => {
		if (hasFinishedWithData(meldingFetcher)) {
			setMeldinger(meldingFetcher.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [meldingFetcher.status]);

    return null;
};
