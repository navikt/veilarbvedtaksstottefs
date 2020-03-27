import { useState } from 'react';
import createUseContext from 'constate';
import { ArenaVedtak, Vedtak } from '../rest/data/vedtak';
import Oppfolging from '../rest/data/oppfolging-data';
import { MalformData } from '../rest/data/malform';
import { Features } from '../rest/data/features';
import { Veileder } from '../rest/data/veiledere';
import { DialogMelding } from '../rest/data/dialog-melding';
import { finnUtkastAlltid } from '../utils';

// Data med placeholder er garantert av datafetcher.ts at det er tilgjengelig i hele appen
const placeholder = {} as any;

export const useDataStore = createUseContext(() => {
	const [oppfolgingData, setOppfolgingData] = useState<Oppfolging>(placeholder);
	const [malform, setMalform] = useState<MalformData>(placeholder);
	const [features, setFeatures] = useState<Features>(placeholder);
	const [innloggetVeileder, setInnloggetVeileder] = useState<Veileder>(placeholder);
	const [vedtak, setVedtak] = useState<Vedtak[]>([]);
	const [arenaVedtak, setArenaVedtak] = useState<ArenaVedtak[]>([]);
	const [dialogMeldinger, setDialogMeldinger] = useState<DialogMelding[]>([]);

	function leggTilDialogMelding(melding: string, ident: string, navn: string) {
		const dialogMelding: DialogMelding = {
			melding,
			opprettet: new Date().toISOString(),
			opprettetAvIdent: ident,
			opprettetAvNavn: navn
		};

		setDialogMeldinger((curMeldinger) => [...curMeldinger, dialogMelding])
	}

	function leggTilSystemMelding (melding: string) {
			const systemMelding: DialogMelding = {
				melding,
				opprettet: new Date().toISOString(),
				opprettetAvIdent: null,
				opprettetAvNavn: null
			};

			setDialogMeldinger((curMeldinger) => [...curMeldinger, systemMelding]);
	}

	function setUtkastBeslutterProsessStartet() {
		const utkast = finnUtkastAlltid(vedtak);
		utkast.beslutterProsessStartet = true;
	}

	function setUtkastGodkjent() {
		const utkast = finnUtkastAlltid(vedtak);
		utkast.godkjentAvBeslutter = true;
	}

	function setUtkastBeslutter(beslutterIdent: string, beslutterNavn: string) {
		const utkast = finnUtkastAlltid(vedtak);
		utkast.beslutterIdent = beslutterIdent;
		utkast.beslutterNavn = beslutterNavn;
	}

	function setUtkastVeileder(veilederIdent: string, veilederNavn: string) {
		const utkast = finnUtkastAlltid(vedtak);
		utkast.veilederIdent = veilederIdent;
		utkast.veilederNavn = veilederNavn;
	}

	return {
		oppfolgingData, setOppfolgingData,
		malform, setMalform,
		features, setFeatures,
		innloggetVeileder, setInnloggetVeileder,
		vedtak, setVedtak,
		arenaVedtak, setArenaVedtak,
		dialogMeldinger, setDialogMeldinger,
		leggTilDialogMelding,
		setUtkastBeslutterProsessStartet,
		setUtkastGodkjent,
		setUtkastBeslutter,
		setUtkastVeileder,
		leggTilSystemMelding
	};
});
