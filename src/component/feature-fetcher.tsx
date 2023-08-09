import { useAxiosFetcher } from '../util/use-axios-fetcher';
import { fetchFeaturesToggles } from '../api/veilarbpersonflatefs';
import { PropsWithChildren, useLayoutEffect } from 'react';
import { ifResponseHasData } from '../api/utils';
import Spinner from './spinner/spinner';
import { useDataStore } from '../store/data-store';
import { Alert } from '@navikt/ds-react';

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
			<Alert variant="error" className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
	}

	return featureAxiosFetcher.data ? props.children : null;
}

export default FeatureFetcher;
