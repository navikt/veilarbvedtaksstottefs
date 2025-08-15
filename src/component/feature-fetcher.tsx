import { useAxiosFetcher } from '../util/use-axios-fetcher';
import { fetchFeaturesToggles } from '../api/obo-unleash';
import { PropsWithChildren, useLayoutEffect, type JSX } from 'react';
import { ifResponseHasData } from '../api/utils';
import Spinner from './spinner/spinner';
import { useDataStore } from '../store/data-store';
import { IkkeKontaktMedBaksystemFeilmelding } from './feilmelding/ikke-kontakt-med-baksystem-feilmelding';

function FeatureFetcher(props: PropsWithChildren<unknown>): JSX.Element | null {
	const featureAxiosFetcher = useAxiosFetcher(fetchFeaturesToggles);
	const { setFeatures } = useDataStore();

	useLayoutEffect(() => {
		featureAxiosFetcher.fetch().then(ifResponseHasData(setFeatures)).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (featureAxiosFetcher.loading) {
		return <Spinner />;
	} else if (featureAxiosFetcher.error) {
		return <IkkeKontaktMedBaksystemFeilmelding />;
	}

	return featureAxiosFetcher.data ? <>{props.children}</> : null;
}

export default FeatureFetcher;
