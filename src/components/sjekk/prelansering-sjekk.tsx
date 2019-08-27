import React, { PropsWithChildren, useEffect } from 'react';
import { Prelansering } from '../../pages/prelansering/prelansering';
import { PRELANSERING_TOGGLE } from '../../rest/data/features';
import { useFetchStore } from '../../stores/fetch-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../../rest/utils';
import Spinner from '../spinner/spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const { features } = useFetchStore();

	useEffect(() => {
		if (isNotStarted(features)) {
			features.fetch(null);
		}
	}, [features]);

	if (isAnyNotStartedOrPending([features])) {
		return <Spinner />;
	} else if (hasAnyFailed([features])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return features.data[PRELANSERING_TOGGLE] ? <Prelansering /> : props.children;
}
