import React, { PropsWithChildren, useEffect } from 'react';
import { Prelansering } from '../../pages/prelansering/prelansering';
import { PILOT_TOGGLE, PRELANSERING_TOGGLE } from '../../rest/data/features';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../../rest/utils';
import Spinner from '../spinner/spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const { featuresFetcher } = useDataFetcherStore();

	useEffect(() => {
		if (isNotStarted(featuresFetcher)) {
			featuresFetcher.fetch(null);
		}
	}, [featuresFetcher]);

	if (isAnyNotStartedOrPending([featuresFetcher])) {
		return <Spinner />;
	} else if (hasAnyFailed([featuresFetcher])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return (featuresFetcher.data[PRELANSERING_TOGGLE] && !featuresFetcher.data[PILOT_TOGGLE]) ? <Prelansering /> : props.children;
}
