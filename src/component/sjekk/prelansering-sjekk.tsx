import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Prelansering } from '../../page/prelansering/prelansering';
import { PILOT_TOGGLE, PRELANSERING_TOGGLE } from '../../api/data/features';
import Spinner from '../spinner/spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useDataStore } from '../../store/data-store';
import { useFetchFeatures } from '../../api/api';

// NB! Henting av features og populering i data store hook må flyttes til data-fetcher.tsx når denne komponenten skal fjernes
export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const featuresState = useFetchFeatures();
	const [harSattFeatures, setHarSattFeatures] = useState(false);

	const { features, setFeatures } = useDataStore();

	useEffect(() => {
		if (featuresState.data) {
			setFeatures(featuresState.data);
			setHarSattFeatures(true);
		}
	}, [featuresState, setFeatures]);

	if (featuresState.isLoading || !harSattFeatures) {
		return <Spinner />;
	} else if (featuresState.error) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</AlertStripeFeil>
		);
	}

	return features[PRELANSERING_TOGGLE] && !features[PILOT_TOGGLE] ? <Prelansering /> : props.children;
}
