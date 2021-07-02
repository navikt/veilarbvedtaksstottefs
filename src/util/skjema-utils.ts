import { erStandard, erVarigEllerGradertVarig } from './innsatsgruppe';
import { OrNothing } from './type/ornothing';
import { HovedmalType, InnsatsgruppeType, Vedtak } from '../api/veilarbvedtaksstotte';
import { MalformData, MalformType } from '../api/veilarbperson';
import { Kilde } from '../page/utkast/skjema-section/kilder/kilder';
import { SkjemaFeil } from './type/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from '../page/utkast/skjema-section/begrunnelse/begrunnelse';

export interface SkjemaData {
	opplysninger: string[] | undefined;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	begrunnelse: OrNothing<string>;
}

export const kildelisteBokmal = [
	'Svarene dine fra da du registrerte deg',
	'CV-en/jobbprofilen din på nav.no',
	'Svarene dine om behov for veiledning'
];

export const kildelisteNynorsk = [
	'Svara dine frå då du registrerte deg',
	'CV-en/jobbprofilen din på nav.no',
	'Svara dine om behov for rettleiing'
];

export function hentMalformFraData(malformData: MalformData | null): MalformType | null {
	return malformData ? malformData.malform : null;
}

export function mapKilderFraForskjelligMalformTilBokmal(kildeListe: string[]): string[] {
	return kildeListe.map(kilde => {
		const translationPos = kildelisteNynorsk.indexOf(kilde);
		return translationPos === -1 ? kilde : kildelisteBokmal[translationPos];
	});
}

export function mapKilderFraBokmalTilBrukersMalform(
	kildeListe: string[] | undefined,
	malformType: MalformType | null
): string[] {
	if (!kildeListe) return [];

	// Trenger ikke å mappe hvis vi ikke vet malform, ikke støtter oversettelse for malform, eller det allerede er på bokmål
	if (
		!malformType ||
		!Object.values(MalformType).includes(malformType) ||
		malformType === MalformType.NB ||
		malformType === MalformType.nb
	) {
		return kildeListe;
	}

	return kildeListe.map(kilde => {
		const translationPos = kildelisteBokmal.indexOf(kilde);
		return translationPos === -1 ? kilde : kildelisteNynorsk[translationPos];
	});
}

export function mergeMedDefaultKilder(kildeListe: string[]): Kilde[] {
	const kilder = kildelisteBokmal.map(kildeTekst => ({
		navn: kildeTekst,
		erValgt: kildeListe.includes(kildeTekst)
	}));

	kildeListe
		.filter(kildeTekst => !kildelisteBokmal.includes(kildeTekst))
		.forEach(kildeTekst => kilder.push({ navn: kildeTekst, erValgt: true }));

	return kilder;
}

export function erDefaultKilde(kilde: string) {
	return kildelisteBokmal.some(defaultKilde => defaultKilde === kilde);
}

export function harFeil(skjemaFeil: SkjemaFeil): boolean {
	return Object.keys(skjemaFeil).length > 0;
}

export function scrollTilForsteFeil(skjemaFeil: SkjemaFeil): void {
	let forsteFeilNavn;

	if (skjemaFeil.kilder) {
		forsteFeilNavn = 'kilder';
	} else if (skjemaFeil.begrunnelse) {
		forsteFeilNavn = 'begrunnelse';
	} else if (skjemaFeil.innsatsgruppe) {
		forsteFeilNavn = 'innsatsgruppe';
	} else if (skjemaFeil.hovedmal) {
		forsteFeilNavn = 'hovedmal';
	}

	if (forsteFeilNavn) {
		const tittelElem = document.getElementById(forsteFeilNavn + '-scroll-to');
		if (tittelElem) {
			tittelElem.scrollIntoView({ block: 'center' });
		}
	}
}

export function validerSkjema(skjema: SkjemaData, gjeldendeVedtak: OrNothing<Vedtak>): SkjemaFeil {
	const errors: SkjemaFeil = {};
	const { innsatsgruppe, opplysninger, begrunnelse, hovedmal } = skjema;

	if (!innsatsgruppe) {
		errors.innsatsgruppe = 'Mangler innsatsgruppe';
	}

	if (!hovedmal && innsatsgruppe !== InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
		errors.hovedmal = 'Mangler hovedmål';
	}

	if (!harSkrevetBegrunnelse(begrunnelse) && maSkriveBegrunnelse(innsatsgruppe, gjeldendeVedtak)) {
		errors.begrunnelse = 'Mangler begrunnelse';
	}

	const begrunnelsefeil = validerBegrunnelseMaxLength(begrunnelse);
	Object.assign(errors, begrunnelsefeil);

	if (!opplysninger || opplysninger.length < 1) {
		errors.kilder = 'Mangler kilder';
	}

	return errors;
}

export function validerBegrunnelseMaxLength(begrunnelse: OrNothing<string>) {
	const errors: SkjemaFeil = {};
	if (begrunnelse && begrunnelse.length > BEGRUNNELSE_MAX_LENGTH) {
		errors.begrunnelse = `Du kan maksimalt skrive ${BEGRUNNELSE_MAX_LENGTH} tegn`;
	}
	return errors;
}

export function trengerKvalitetssikrer(innsatsgruppe: OrNothing<InnsatsgruppeType>) {
	return erVarigEllerGradertVarig(innsatsgruppe);
}

export function harSkrevetBegrunnelse(begrunnelse: OrNothing<string>) {
	return begrunnelse ? begrunnelse.trim().length > 0 : false;
}

/**
 * Begrunnelse må fylles ut hvis innsatsgruppe ikke er standard.
 * Unntaket for denne reglen er hvis det gjeldende vedtaket er varig/gradert varig.
 */
export function maSkriveBegrunnelse(innsatsgruppe: OrNothing<InnsatsgruppeType>, gjeldendeVedtak: OrNothing<Vedtak>) {
	const erStandardInnsatsValgt = erStandard(innsatsgruppe);

	if (!erStandardInnsatsValgt) {
		return true;
	}

	const erGjeldendeInnsatsVarig = gjeldendeVedtak && erVarigEllerGradertVarig(gjeldendeVedtak.innsatsgruppe);

	return erStandardInnsatsValgt && erGjeldendeInnsatsVarig;
}
