import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useFetchStore } from '../stores/fetch-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import Spinner from './spinner/spinner';

export function DataFetcher(props: { fnr: string; children: any }) {
	const {
		oppfolgingData, features, malform,
		vedtak, innloggetVeileder, arenaVedtak,
		dialogerMeldinger
	} = useFetchStore();

	useEffect(() => {
		if (isNotStarted(vedtak)) {
			vedtak.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(arenaVedtak)) {
			arenaVedtak.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(oppfolgingData)) {
			oppfolgingData.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(malform)) {
			malform.fetch({ fnr: props.fnr });
		}

		if (isNotStarted(features)) {
			features.fetch(null);
		}

		if (isNotStarted(innloggetVeileder)) {
			innloggetVeileder.fetch(null);
		}

		if (isNotStarted(dialogerMeldinger)) {
			dialogerMeldinger.fetch({ fnr: props.fnr });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vedtak, oppfolgingData, malform, features]);

	if (isAnyNotStartedOrPending([vedtak, malform, oppfolgingData, features, innloggetVeileder, arenaVedtak, dialogerMeldinger])) {
		return <Spinner />;
	} else if (hasAnyFailed([vedtak, malform, oppfolgingData, features, innloggetVeileder, dialogerMeldinger])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return props.children;
}
