import React, { PropsWithChildren, useLayoutEffect } from 'react';
import { Prelansering } from '../../page/prelansering/prelansering';
import Spinner from '../spinner/spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useDataStore } from '../../store/data-store';
import { fetchFeaturesToggles, PILOT_TOGGLE } from '../../api/veilarbpersonflatefs';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { ifResponseHasData } from '../../api/utils';

// NB! Henting av features og populering i data store hook må flyttes til data-fetcher.tsx når denne komponenten skal fjernes
export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const featureFetcher = useAxiosFetcher(fetchFeaturesToggles);

	const { features, setFeatures } = useDataStore();

	// Siden loading = false før vi kaller fetch så vil children bli rendret et par ms med useEffect()
	useLayoutEffect(() => {
		featureFetcher.fetch().then(ifResponseHasData(setFeatures)).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (featureFetcher.loading) {
		return <Spinner />;
	} else if (featureFetcher.error) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</AlertStripeFeil>
		);
	}

	return features[PILOT_TOGGLE] ? props.children : <Prelansering />;
}
