import dayjs from 'dayjs';
import { Fagdokument, KursVarighetEnhetDtoV2, SprakferdighetDtoV2 } from './dto/CvDto';
import {
	AndreForholdSvar,
	DinSituasjonSvar,
	FremtidigSituasjonSvar,
	HelseHinderSvar,
	ProfilertInnsatsgruppe,
	SisteStillingSvar,
	TilbakeIArbeidSvar,
	UtdanningBestattSvar,
	UtdanningGodkjentSvar,
	UtdanningSvar
} from './dto/RegistreringDto';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';

export function fagdokumentTypeLabel(type: Fagdokument) {
	let mapping = new Map<Fagdokument, string>([
		[Fagdokument.AUTORISASJON, 'Autorisasjon'],
		[Fagdokument.MESTERBREV, 'Mesterbrev'],
		[Fagdokument.SVENNEBREV_FAGBREV, 'Fagbrev/Svennebrev']
	]);

	return mapping.get(type);
}

export function spraakNivoLabel(nivo: SprakferdighetDtoV2) {
	let mapping = new Map<SprakferdighetDtoV2, string>([
		[SprakferdighetDtoV2.FOERSTESPRAAK, 'Førstespråk (morsmål)'],
		[SprakferdighetDtoV2.VELDIG_GODT, 'Veldig godt'],
		[SprakferdighetDtoV2.GODT, 'Godt'],
		[SprakferdighetDtoV2.NYBEGYNNER, 'Nybegynner'],
		[SprakferdighetDtoV2.IKKE_OPPGITT, 'Ikke oppgitt']
	]);

	return mapping.get(nivo);
}

export function ansettelsestypeLabel(ansettelsestype: string | null) {
	let mapping = new Map<string, string>([
		['FAST', 'Fast'],
		['VIKARIAT', 'Vikariat'],
		['ENGASJEMENT', 'Engasjement'],
		['PROSJEKT', 'Prosjekt'],
		['SESONG', 'Sesong'],
		['TRAINEE', 'Trainee'],
		['LAERLING', 'Lærling'],
		['SELVSTENDIG_NAERINGSDRIVENDE', 'Selvstendig næringsdrivende'],
		['FERIEJOBB', 'Feriejobb'],
		['ANNET', 'Annet']
	]);

	if (ansettelsestype && mapping.has(ansettelsestype)) {
		return mapping.get(ansettelsestype);
	}

	return ansettelsestype;
}

export function onsketArbeidstidsordningLabel(onsketArbeidstidsordning: string | null) {
	let mapping = new Map<string, string>([
		['DAGTID', 'Dagtid'],
		['KVELD', 'Kveld'],
		['NATT', 'Natt'],
		['UKEDAGER', 'Ukedager'],
		['LOERDAG', 'Lørdag'],
		['SOENDAG', 'Søndag'],
		['SKIFT', 'Skift'],
		['VAKT', 'Vakt'],
		['TURNUS', 'Turnus']
	]);

	if (onsketArbeidstidsordning && mapping.has(onsketArbeidstidsordning)) {
		return mapping.get(onsketArbeidstidsordning);
	}
	return onsketArbeidstidsordning;
}

export function onsketArbeidsskiftordningLabel(onsketArbeidsskiftordning: string | null) {
	let mapping = new Map<string, string>([
		['DAGTID', 'Dagtid'],
		['KVELD', 'Kveld'],
		['NATT', 'Natt'],
		['UKEDAGER', 'Ukedager'],
		['LOERDAG', 'Lørdag'],
		['SOENDAG', 'Søndag'],
		['SKIFT', 'Skift'],
		['VAKT', 'Vakt'],
		['TURNUS', 'Turnus']
	]);

	if (onsketArbeidsskiftordning && mapping.has(onsketArbeidsskiftordning)) {
		return mapping.get(onsketArbeidsskiftordning);
	}
	return onsketArbeidsskiftordning;
}

export function oppstartLabel(oppstart: String) {
	let mapping = new Map<String, string>([
		['LEDIG_NAA', 'Kan begynne nå'],
		['ETTER_TRE_MND', 'Har 3 måneders oppsigelse'],
		['ETTER_AVTALE', 'Kan begynne etter nærmere avtale']
	]);

	return mapping.get(oppstart);
}

export function utdanningSvarLabel(svar: UtdanningSvar) {
	let mapping = new Map<UtdanningSvar, string>([
		[UtdanningSvar.INGEN_UTDANNING, 'Ingen utdanning'],
		[UtdanningSvar.GRUNNSKOLE, 'Grunnskole'],
		[UtdanningSvar.VIDEREGAENDE_GRUNNUTDANNING, 'Videregående grunnutdanning (1 til 2 år)'],
		[UtdanningSvar.VIDEREGAENDE_FAGBREV_SVENNEBREV, 'Videregående, fagbrev eller svennebrev (3 år eller mer)'],
		[UtdanningSvar.HOYERE_UTDANNING_1_TIL_4, 'Høyere utdanning (1 til 4 år)'],
		[UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER, 'Høyere utdanning (5 år eller mer)']
	]);
	return mapping.get(svar);
}

export function utdanningGodkjentSvarLabel(svar: UtdanningGodkjentSvar) {
	let mapping = new Map<UtdanningGodkjentSvar, string>([
		[UtdanningGodkjentSvar.JA, 'Ja'],
		[UtdanningGodkjentSvar.NEI, 'Nei'],
		[UtdanningGodkjentSvar.VET_IKKE, 'Vet ikke'],
		[UtdanningGodkjentSvar.INGEN_SVAR, 'Ikke besvart']
	]);
	return mapping.get(svar);
}

export function utdanningBestattSvarLabel(svar: UtdanningBestattSvar) {
	let mapping = new Map<UtdanningBestattSvar, string>([
		[UtdanningBestattSvar.JA, 'Ja'],
		[UtdanningBestattSvar.NEI, 'Nei'],
		[UtdanningBestattSvar.INGEN_SVAR, 'Ikke besvart']
	]);
	return mapping.get(svar);
}

export function helseHinderLabel(svar: HelseHinderSvar) {
	let mapping = new Map<HelseHinderSvar, string>([
		[HelseHinderSvar.JA, 'Ja'],
		[HelseHinderSvar.NEI, 'Nei'],
		[HelseHinderSvar.INGEN_SVAR, 'Ikke besvart']
	]);
	return mapping.get(svar);
}

export function andreForholdLabel(svar: AndreForholdSvar) {
	let mapping = new Map<AndreForholdSvar, string>([
		[AndreForholdSvar.JA, 'Ja'],
		[AndreForholdSvar.NEI, 'Nei'],
		[AndreForholdSvar.INGEN_SVAR, 'Ikke besvart']
	]);
	return mapping.get(svar);
}

export function sisteStillingLabel(svar: SisteStillingSvar) {
	let mapping = new Map<SisteStillingSvar, string>([
		[SisteStillingSvar.HAR_HATT_JOBB, 'Har vært i jobb'],
		[SisteStillingSvar.HAR_IKKE_HATT_JOBB, 'Har ikke vært i jobb'],
		[SisteStillingSvar.INGEN_SVAR, 'Ikke besvart']
	]);
	return mapping.get(svar);
}

export function dinSituasjonLabel(svar: DinSituasjonSvar) {
	let mapping = new Map<DinSituasjonSvar, string>([
		[DinSituasjonSvar.MISTET_JOBBEN, 'Har mistet eller kommer til å miste jobben'],
		[DinSituasjonSvar.HAR_SAGT_OPP, 'Har sagt opp eller kommer til å si opp'],
		[DinSituasjonSvar.DELTIDSJOBB_VIL_MER, 'Har deltidsjobb, men vil jobbe mer'],
		[DinSituasjonSvar.ALDRI_HATT_JOBB, 'Har aldri vært i jobb'],
		[DinSituasjonSvar.VIL_BYTTE_JOBB, 'Har jobb, men vil bytte'],
		[DinSituasjonSvar.JOBB_OVER_2_AAR, 'Har ikke vært i jobb de siste 2 årene'],
		[DinSituasjonSvar.ER_PERMITTERT, 'Er permittert eller kommer til å bli permittert'],
		[DinSituasjonSvar.USIKKER_JOBBSITUASJON, 'Er usikker på jobbsituasjonen min'],
		[DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING, 'Har akkurat fullført utdanning, militærtjeneste eller annet'],
		[DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, 'Har jobb og ønsker å fortsette i den jobben jeg er i'],
		[DinSituasjonSvar.OPPSIGELSE, 'Jeg har blitt sagt opp av arbeidsgiver'],
		[DinSituasjonSvar.ENDRET_PERMITTERINGSPROSENT, 'Arbeidsgiver har endret permitteringen min'],
		[DinSituasjonSvar.TILBAKE_TIL_JOBB, 'Jeg skal tilbake i jobb hos min nåværende arbeidsgiver'],
		[DinSituasjonSvar.NY_JOBB, 'Jeg skal begynne å jobbe hos en annen arbeidsgiver'],
		[DinSituasjonSvar.MIDLERTIDIG_JOBB, 'Jeg har fått midlertidig jobb hos en annen arbeidsgiver'],
		[DinSituasjonSvar.KONKURS, 'Arbeidsgiveren min er konkurs'],
		[DinSituasjonSvar.SAGT_OPP, 'Jeg har sagt opp jobben min'],
		[DinSituasjonSvar.ANNET, 'Situasjonen min har endret seg, men ingen av valgene passet']
	]);
	return mapping.get(svar);
}

export function fremtidigSituasjonLabel(svar: FremtidigSituasjonSvar) {
	let mapping = new Map<FremtidigSituasjonSvar, string>([
		[FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER, 'Jeg skal tilbake til jobben jeg har'],
		[
			FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING,
			'Jeg skal tilbake til arbeidsgiveren min, men i ny stilling'
		],
		[FremtidigSituasjonSvar.NY_ARBEIDSGIVER, 'Jeg trenger ny jobb'],
		[FremtidigSituasjonSvar.USIKKER, 'Jeg er usikker'],
		[FremtidigSituasjonSvar.INGEN_PASSER, 'Ingen av disse alternativene passer']
	]);
	return mapping.get(svar);
}

export function tilbakeIArbeidLabel(svar: TilbakeIArbeidSvar) {
	let mapping = new Map<TilbakeIArbeidSvar, string>([
		[TilbakeIArbeidSvar.JA_FULL_STILLING, 'Ja, i full stilling'],
		[TilbakeIArbeidSvar.JA_REDUSERT_STILLING, 'Ja, i redusert stilling'],
		[TilbakeIArbeidSvar.USIKKER, 'Usikker'],
		[TilbakeIArbeidSvar.NEI, 'Nei']
	]);
	return mapping.get(svar);
}

export function innsatsgruppeLabel(svar: ProfilertInnsatsgruppe) {
	let mapping = new Map<ProfilertInnsatsgruppe, string>([
		[ProfilertInnsatsgruppe.STANDARD_INNSATS, 'Standard innsats'],
		[ProfilertInnsatsgruppe.SITUASJONSBESTEMT_INNSATS, 'Situasjonsbestemt innsats'],
		[ProfilertInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING, 'Behov for arbeidsevnevurdering']
	]);
	return mapping.get(svar);
}

export function profilertTilBeskrivelse(profilertTil: ProfilertTil) {
	switch (profilertTil) {
		case ProfilertTil.ANTATT_GODE_MULIGHETER:
			return 'Antatt rask overgang til arbeid: Vurder om brukeren har gode muligheter til å beholde eller komme i jobb på egenhånd.';
		case ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING:
			return 'Antatt behov for veiledning: Vurder brukerens jobbmuligheter og behov for veiledning.';
		case ProfilertTil.OPPGITT_HINDRINGER:
			return 'Brukeren har oppgitt hindringer: Vurder brukerens jobbmuligheter og behov for veiledning.';
		default:
			return profilertTil;
	}
}

export function formatVarighet(varighet: number | null, varighetEnhet: KursVarighetEnhetDtoV2 | null) {
	if (varighet == null || varighetEnhet == null) return;
	if (varighet === 1) {
		switch (varighetEnhet) {
			case KursVarighetEnhetDtoV2.TIME:
				return 'time';
			case KursVarighetEnhetDtoV2.DAG:
				return 'dag';
			case KursVarighetEnhetDtoV2.UKE:
				return 'uke';
			case KursVarighetEnhetDtoV2.MND:
				return 'måned';
		}
	} else {
		switch (varighetEnhet) {
			case KursVarighetEnhetDtoV2.TIME:
				return 'timer';
			case KursVarighetEnhetDtoV2.DAG:
				return 'dager';
			case KursVarighetEnhetDtoV2.UKE:
				return 'uker';
			case KursVarighetEnhetDtoV2.MND:
				return 'måneder';
		}
	}
}

export function formatDates(value: string | null) {
	const yearMonthDayRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
	const yearMonthRegex = new RegExp('^\\d{4}-\\d{2}$');

	// regex for uønskede konverteringer som dayjs anser som gyldige datoer
	const invalidDatesRegex = new RegExp('^\\d{4}$');

	if (value == null) {
		return;
	}

	if (value.match(yearMonthDayRegex)) {
		return dayjs(value).format('DD. MMMM YYYY');
	} else if (value.match(yearMonthRegex)) {
		return dayjs(value).format('MMMM YYYY');
	} else if (!value.match(invalidDatesRegex) && dayjs(value).isValid()) {
		return dayjs(value).format('DD. MMM YYYY kl. HH:mm');
	}
}
