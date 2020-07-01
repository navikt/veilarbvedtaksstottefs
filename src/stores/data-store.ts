import { useState } from 'react';
import createUseContext from 'constate';
import { ArenaVedtak, BeslutterProsessStatus, Vedtak } from '../rest/data/vedtak';
import Oppfolging from '../rest/data/oppfolging-data';
import { MalformData } from '../rest/data/malform';
import { Features } from '../rest/data/features';
import { Veileder } from '../rest/data/veiledere';
import { DialogMelding as DialogMeldingData, SystemMelding as SystemMeldingData } from '../rest/data/melding';
import { MeldingType, SystemMeldingType } from '../utils/types/melding-type';

// Data med placeholder er garantert av datafetcher.ts å være hentet
const placeholder = {} as any;

export const useDataStore = createUseContext(() => {
	const [oppfolgingData, setOppfolgingData] = useState<Oppfolging>(placeholder);
	const [malform, setMalform] = useState<MalformData>(placeholder);
	const [features, setFeatures] = useState<Features>(placeholder);
	const [innloggetVeileder, setInnloggetVeileder] = useState<Veileder>(placeholder);
	const [utkast, setUtkast] = useState<Vedtak | null>(null);
	const [fattedeVedtak, setFattedeVedtak] = useState<Vedtak[]>([]);
	const [arenaVedtak, setArenaVedtak] = useState<ArenaVedtak[]>([]);
	const [meldinger, setMeldinger] = useState<Array<DialogMeldingData | SystemMeldingData>>([]);

	function isFeaturesHentet() {
		return features !== placeholder;
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

	function setUtkastBeslutter(beslutterIdent: string, beslutterNavn: string) {
		if (utkast) {
			setUtkast({...utkast, beslutterIdent, beslutterNavn });
		}
	}

	function setUtkastVeileder(veilederIdent: string, veilederNavn: string) {
		if (utkast) {
			setUtkast({...utkast, veilederIdent, veilederNavn });
		}
	}

	function setBeslutterProsessStatus(beslutterProsessStatus: BeslutterProsessStatus) {
		if (utkast) {
			setUtkast({...utkast, beslutterProsessStatus });
		}
	}

	return {
		oppfolgingData, setOppfolgingData,
		malform, setMalform,
		features, setFeatures, isFeaturesHentet,
		innloggetVeileder, setInnloggetVeileder,
		utkast, setUtkast,
		fattedeVedtak, setFattedeVedtak,
		arenaVedtak, setArenaVedtak,
		meldinger, setMeldinger,
		leggTilSystemMelding,
		setUtkastBeslutter,
		setUtkastVeileder,
		setBeslutterProsessStatus
	};
});