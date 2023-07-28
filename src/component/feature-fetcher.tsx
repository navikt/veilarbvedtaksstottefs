import { useAxiosFetcher } from '../util/use-axios-fetcher';
import { fetchFeaturesToggles } from '../api/veilarbpersonflatefs';
import { PropsWithChildren, useLayoutEffect } from 'react';
import { ifResponseHasData } from '../api/utils';
import Spinner from './spinner/spinner';
import AlertStripeFeil from 'nav-frontend-alertstriper/lib/feil-alertstripe';
import { useDataStore } from '../store/data-store';

function FeatureFetcher(props: PropsWithChildren<any>) {
	const featureAxiosFetcher = useAxiosFetcher(fetchFeaturesToggles);
	const { setFeatures } = useDataStore();

	useLayoutEffect(() => {
		featureAxiosFetcher.fetch().then(ifResponseHasData(setFeatures)).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (featureAxiosFetcher.loading) {
		return <Spinner />;
	} else if (featureAxiosFetcher.error) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</AlertStripeFeil>
		);
	}

	return featureAxiosFetcher.data ? props.children : null;
}

export default FeatureFetcher;
