import React, { PropsWithChildren, useEffect } from 'react';
import { Prelansering } from '../../pages/prelansering/prelansering';
import { Features, PILOT_TOGGLE, PRELANSERING_TOGGLE } from '../../rest/data/features';
import { hasData, hasFailed, isNotStartedOrPending, useFetchResponsePromise } from '../../rest/utils';
import Spinner from '../spinner/spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useDataStore } from '../../stores/data-store';
import { fetchFeatures } from '../../rest/api';

// NB! Henting av features og populering i data store hook må flyttes til data-fetcher.tsx når denne komponenten skal fjernes
export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const featuresPromise = useFetchResponsePromise<Features>();

	const {features, setFeatures} = useDataStore();

	useEffect(() => {
		featuresPromise.evaluate(fetchFeatures());
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (hasData(featuresPromise)) {
			setFeatures(featuresPromise.data);
		}
		// eslint-disable-next-line
	}, [featuresPromise]);

	if (isNotStartedOrPending(featuresPromise)) {
		return <Spinner />;
	} else if (hasFailed(featuresPromise)) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return (features[PRELANSERING_TOGGLE] && !features[PILOT_TOGGLE]) ? <Prelansering /> : props.children;
}
