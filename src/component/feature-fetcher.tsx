import { useAxiosFetcher } from '../util/use-axios-fetcher';
import { fetchFeaturesToggles } from '../api/veilarbpersonflatefs';
import { useAppStore } from '../store/app-store';
import React, { PropsWithChildren, useLayoutEffect } from 'react';
import { ifResponseHasData } from '../api/utils';
import Spinner from './spinner/spinner';
import AlertStripeFeil from 'nav-frontend-alertstriper/lib/feil-alertstripe';

function FeatureFetcher(props: PropsWithChildren<any>) {
	const featureFetcherAxios = useAxiosFetcher(fetchFeaturesToggles);
	const { setFeatures } = useAppStore();

	useLayoutEffect(() => {
		featureFetcherAxios.fetch().then(ifResponseHasData(setFeatures)).catch();
	}, []);

	if (featureFetcherAxios.loading) {
		return <Spinner />;
	} else if (featureFetcherAxios.error) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</AlertStripeFeil>
		);
	}

	return featureFetcherAxios.data ? props.children : null;
}

export default FeatureFetcher;
