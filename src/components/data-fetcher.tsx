import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import Spinner from './spinner/spinner';

export function DataFetcher(props: { fnr: string; children: any }) {
	const {
		oppfolgingDataFetcher, featuresFetcher, malformFetcher,
		utkastFetcher, fattedeVedtakFetcher,
		innloggetVeilederFetcher, arenaVedtakFetcher
	} = useDataFetcherStore();

	useEffect(() => {
		if (isNotStarted(utkastFetcher)) {
			utkastFetcher.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(fattedeVedtakFetcher)) {
			fattedeVedtakFetcher.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(arenaVedtakFetcher)) {
			arenaVedtakFetcher.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(oppfolgingDataFetcher)) {
			oppfolgingDataFetcher.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(malformFetcher)) {
			malformFetcher.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(featuresFetcher)) {
			featuresFetcher.fetch(null);
		}

		if (isNotStarted(innloggetVeilederFetcher)) {
			innloggetVeilederFetcher.fetch(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [utkastFetcher, fattedeVedtakFetcher, oppfolgingDataFetcher, malformFetcher, featuresFetcher]);

	if (isAnyNotStartedOrPending([utkastFetcher, fattedeVedtakFetcher, malformFetcher, oppfolgingDataFetcher, featuresFetcher, innloggetVeilederFetcher, arenaVedtakFetcher])) {
		return <Spinner />;
	} else if (hasAnyFailed([utkastFetcher, fattedeVedtakFetcher, malformFetcher, oppfolgingDataFetcher, featuresFetcher, innloggetVeilederFetcher])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return props.children;
}
