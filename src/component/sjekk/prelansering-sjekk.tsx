import { PropsWithChildren, useLayoutEffect } from 'react';
import { Prelansering } from '../../page/prelansering/prelansering';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { fetchTilhorerBrukerUtrulletEnhet } from '../../api/veilarbvedtaksstotte/utrulling';
import { useAppStore } from '../../store/app-store';
import Spinner from '../spinner/spinner';
import { Alert } from '@navikt/ds-react';

// NB! Henting av features og populering i data store hook må flyttes til data-fetcher.tsx når denne komponenten skal fjernes
export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const { fnr } = useAppStore();
	const tilhorerBrukerUtrulletEnhetFetcher = useAxiosFetcher(fetchTilhorerBrukerUtrulletEnhet);

	// Siden loading = false før vi kaller fetch så vil children bli rendret et par ms med useEffect()
	useLayoutEffect(() => {
		tilhorerBrukerUtrulletEnhetFetcher.fetch(fnr).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fnr]);

	if (tilhorerBrukerUtrulletEnhetFetcher.loading) {
		return <Spinner />;
	} else if (tilhorerBrukerUtrulletEnhetFetcher.error) {
		return (
			<Alert variant="error" className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
	}

	return tilhorerBrukerUtrulletEnhetFetcher.data ? props.children : <Prelansering />;
}
