import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { hasAnyFailed, isAnyLoading } from '../api/utils-old';
import Spinner from './spinner/spinner';
import {
	useFetchArenaVedtak,
	useFetchFattedeVedtak,
	useFetchInnloggetVeileder,
	useFetchMalform,
	useFetchOppfolging,
	useFetchUtkast
} from '../api/api';
import { useDataStore } from '../store/data-store';
import { useSkjemaStore } from '../store/skjema-store';
import { finnVeilederTilgang } from '../util/tilgang';
import { useTilgangStore } from '../store/tilgang-store';

export function DataFetcher(props: { fnr: string; children: any }) {
	const { initSkjema } = useSkjemaStore();
	const {
		setFattedeVedtak,
		setOppfolgingData,
		setMalform,
		setUtkast,
		setInnloggetVeileder,
		setArenaVedtak
	} = useDataStore();
	const { setVeilederTilgang } = useTilgangStore();

	const fattedeVedtakState = useFetchFattedeVedtak(props.fnr);
	const oppfolgingDataState = useFetchOppfolging(props.fnr);
	const malformDataState = useFetchMalform(props.fnr);
	const utkastState = useFetchUtkast(props.fnr);
	const innloggetVeilederState = useFetchInnloggetVeileder();
	const arenaVedtakState = useFetchArenaVedtak(props.fnr);

	useEffect(() => {
		if (fattedeVedtakState.data) {
			setFattedeVedtak(fattedeVedtakState.data);
		}
		if (oppfolgingDataState.data) {
			setOppfolgingData(oppfolgingDataState.data);
		}
		if (malformDataState.data) {
			setMalform(malformDataState.data);
		}
		if (utkastState.data) {
			setUtkast(utkastState.data);
			initSkjema(utkastState.data);
		}
		if (innloggetVeilederState.data) {
			setInnloggetVeileder(innloggetVeilederState.data);
		}
		if (arenaVedtakState.data) {
			setArenaVedtak(arenaVedtakState.data);
		}
		if (innloggetVeilederState.data && !utkastState.isLoading) {
			setVeilederTilgang(finnVeilederTilgang(innloggetVeilederState.data, utkastState.data));
		}
		// eslint-disable-next-line
	}, [
		fattedeVedtakState,
		oppfolgingDataState,
		malformDataState,
		utkastState,
		innloggetVeilederState,
		arenaVedtakState
	]);

	if (
		isAnyLoading([
			fattedeVedtakState,
			oppfolgingDataState,
			malformDataState,
			utkastState,
			innloggetVeilederState,
			arenaVedtakState
		])
	) {
		return <Spinner />;
	} else if (
		hasAnyFailed([
			fattedeVedtakState,
			oppfolgingDataState,
			malformDataState,
			innloggetVeilederState,
			arenaVedtakState
		]) ||
		// API gir 404 dersom utkast ikke eksisterer
		(utkastState.error && utkastState.error.status !== 404)
	) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</AlertStripeFeil>
		);
	}

	return props.children;
}
