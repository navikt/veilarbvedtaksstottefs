import React, { PropsWithChildren, useEffect } from 'react';
import { Prelansering } from '../../pages/prelansering/prelansering';
import { Features, PILOT_TOGGLE, PRELANSERING_TOGGLE } from '../../rest/data/features';
import { hasAnyFailed2, hasData2, isAnyNotStartedOrPending2, useFetchResonsPromise } from '../../rest/utils';
import Spinner from '../spinner/spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useDataStore } from '../../stores/data-store';
import { fetchFeatures } from '../../rest/api';

export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const featuresPromise = useFetchResonsPromise<Features>();

	const {features, setFeatures} = useDataStore();
	useEffect(() => {
		featuresPromise.evaluate(fetchFeatures());
	}, []);

	useEffect(() => {
		if (hasData2(featuresPromise)) {
			setFeatures(featuresPromise.data);
		}
	}, [featuresPromise]);

	if (isAnyNotStartedOrPending2(featuresPromise)) {
		return <Spinner />;
	} else if (hasAnyFailed2(featuresPromise)) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return (features[PRELANSERING_TOGGLE] && !features[PILOT_TOGGLE]) ? <Prelansering /> : props.children;
}
