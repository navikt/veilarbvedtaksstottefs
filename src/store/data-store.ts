import { useState } from 'react';
import constate from 'constate';
import { MeldingType, SystemMeldingType } from '../util/type/melding-type';
import { OrNothing } from '../util/type/ornothing';
import { Veileder } from '../api/veilarbveileder';
import { MalformData } from '../api/veilarbperson';
import Oppfolging from '../api/veilarboppfolging';
import {
	DialogMelding as DialogMeldingData,
	SystemMelding as SystemMeldingData
} from '../api/veilarbvedtaksstotte/meldinger';
import { BeslutterProsessStatus, Utkast, Vedtak } from '../api/veilarbvedtaksstotte';
import { ArenaVedtak } from '../api/veilarbvedtaksstotte/vedtak';
import { FeatureToggles } from '../api/veilarbpersonflatefs';

// Data med placeholder er garantert av data-fetcher.tsx (og prelansering-sjekk.tsx) å være hentet
const placeholder = {} as any;

export const [DataStoreProvider, useDataStore] = constate(() => {
	const [oppfolgingData, setOppfolgingData] = useState<Oppfolging>(placeholder);
	const [malform, setMalform] = useState<MalformData>(placeholder);
	const [features, setFeatures] = useState<FeatureToggles>(placeholder);
	const [innloggetVeileder, setInnloggetVeileder] = useState<Veileder>(placeholder);
	const [utkast, setUtkast] = useState<Utkast | null>(null);
	const [fattedeVedtak, setFattedeVedtak] = useState<Vedtak[]>([]);
	const [arenaVedtak, setArenaVedtak] = useState<ArenaVedtak[]>([]);
	const [meldinger, setMeldinger] = useState<(DialogMeldingData | SystemMeldingData)[]>([]);

	function leggTilSystemMelding(systemMeldingType: SystemMeldingType) {
		const systemMeldingData: SystemMeldingData = {
			opprettet: new Date().toISOString(),
			systemMeldingType,
			utfortAvIdent: innloggetVeileder.ident,
			utfortAvNavn: innloggetVeileder.navn,
			type: MeldingType.SYSTEM_MELDING
		};

		setMeldinger(curMeldinger => [...curMeldinger, systemMeldingData]);
	}

	function setUtkastBeslutter(beslutterIdent: OrNothing<string>, beslutterNavn: OrNothing<string>) {
		if (utkast) {
			setUtkast({ ...utkast, beslutterIdent, beslutterNavn });
		}
	}

	function setUtkastVeileder(veilederIdent: string, veilederNavn: string) {
		if (utkast) {
			setUtkast({ ...utkast, veilederIdent, veilederNavn });
		}
	}

	function setBeslutterProsessStatus(beslutterProsessStatus: OrNothing<BeslutterProsessStatus>) {
		if (utkast) {
			setUtkast({ ...utkast, beslutterProsessStatus });
		}
	}

	function nullStillBeslutterProsess() {
		if (utkast) {
			setUtkast({ ...utkast, beslutterProsessStatus: null, beslutterIdent: null, beslutterNavn: null });
		}
	}

	return {
		oppfolgingData,
		setOppfolgingData,
		malform,
		setMalform,
		features,
		setFeatures,
		innloggetVeileder,
		setInnloggetVeileder,
		utkast,
		setUtkast,
		fattedeVedtak,
		setFattedeVedtak,
		arenaVedtak,
		setArenaVedtak,
		meldinger,
		setMeldinger,
		leggTilSystemMelding,
		setUtkastBeslutter,
		setUtkastVeileder,
		setBeslutterProsessStatus,
		nullStillBeslutterProsess
	};
});
