import { useState } from 'react';
import createUseContext from 'constate';
import { ArenaVedtak, BeslutterProsessStatus, Vedtak} from '../rest/data/vedtak';
import Oppfolging from '../rest/data/oppfolging-data';
import { MalformData } from '../rest/data/malform';
import { Features } from '../rest/data/features';
import { Veileder } from '../rest/data/veiledere';
import { finnUtkastAlltid } from '../utils';
import { DialogMelding as DialogMeldingData, SystemMelding as SystemMeldingData } from '../rest/data/melding';
import { MeldingType, SystemMeldingType } from '../utils/types/melding-type';

// Data med placeholder er garantert av datafetcher.ts at det er tilgjengelig i hele appen
const placeholder = {} as any;

export const useDataStore = createUseContext(() => {
	const [oppfolgingData, setOppfolgingData] = useState<Oppfolging>(placeholder);
	const [malform, setMalform] = useState<MalformData>(placeholder);
	const [features, setFeatures] = useState<Features>(placeholder);
	const [innloggetVeileder, setInnloggetVeileder] = useState<Veileder>(placeholder);
	const [vedtak, setVedtak] = useState<Vedtak[]>([]);
	const [arenaVedtak, setArenaVedtak] = useState<ArenaVedtak[]>([]);
	const [meldinger, setMeldinger] = useState<Array<DialogMeldingData | SystemMeldingData>>([]);

	function leggTilDialogMelding(melding: string) {
		const dialogMeldingData: DialogMeldingData = {
			melding,
			opprettet: new Date().toISOString(),
			opprettetAvIdent: innloggetVeileder.ident,
			opprettetAvNavn: innloggetVeileder.navn,
			type: MeldingType.DIALOG_MELDING
		};

		setMeldinger((curMeldinger) => [...curMeldinger, dialogMeldingData]);
	}

	function leggTilSystemMelding(systemMeldingType: SystemMeldingType) {
		const systemMeldingData : SystemMeldingData = {
			opprettet: new Date().toISOString(),
			systemMeldingType,
			utfortAvIdent: innloggetVeileder.ident,
			utfortAvNavn: innloggetVeileder.navn,
			type: MeldingType.SYSTEM_MELDING
		};

		setMeldinger((curMeldinger) => [...curMeldinger, systemMeldingData])
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

	function setBeslutterProsessStatus(beslutterProsessStatus: BeslutterProsessStatus) {
		const utkast = finnUtkastAlltid(vedtak);
		utkast.beslutterProsessStatus = beslutterProsessStatus;
	}

	return {
		oppfolgingData, setOppfolgingData,
		malform, setMalform,
		features, setFeatures,
		innloggetVeileder, setInnloggetVeileder,
		vedtak, setVedtak,
		arenaVedtak, setArenaVedtak,
		meldinger, setMeldinger,
		leggTilDialogMelding,
		leggTilSystemMelding,
		setUtkastBeslutterProsessStartet,
		setUtkastGodkjent,
		setUtkastBeslutter,
		setUtkastVeileder,
		setBeslutterProsessStatus
	};
});
