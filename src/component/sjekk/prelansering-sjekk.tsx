import { PropsWithChildren, useLayoutEffect } from 'react';
import { Prelansering } from '../../page/prelansering/prelansering';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { fetchTilhorerBrukerUtrulletEnhet } from '../../api/veilarbvedtaksstotte/utrulling';
import { useAppStore } from '../../store/app-store';
import Spinner from '../spinner/spinner';
import { IkkeKontaktMedBaksystemFeilmelding } from '../feilmelding/ikke-kontakt-med-baksystem-feilmelding';

// NB! Henting av features og populering i data store hook må flyttes til data-fetcher.tsx når denne komponenten skal fjernes
export function PrelanseringSjekk(props: PropsWithChildren<any>) {
	const { fnr } = useAppStore();

	const tilhorerBrukerUtrulletEnhetFetcher = useAxiosFetcher(fetchTilhorerBrukerUtrulletEnhet);
	const harVeilederTilgangGjennomUnleashtoggle = true; // Bypass featuretoggle frå Unleash etter lansering
	const skalViseVedtakslosning = tilhorerBrukerUtrulletEnhetFetcher.data || harVeilederTilgangGjennomUnleashtoggle;

	// Siden loading = false før vi kaller fetch så vil children bli rendret et par ms med useEffect()
	useLayoutEffect(() => {
		tilhorerBrukerUtrulletEnhetFetcher.fetch(fnr).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fnr]);

	if (tilhorerBrukerUtrulletEnhetFetcher.loading) {
		return <Spinner />;
	} else if (tilhorerBrukerUtrulletEnhetFetcher.error) {
		return <IkkeKontaktMedBaksystemFeilmelding />;
	}

	return skalViseVedtakslosning ? props.children : <Prelansering />;
}
