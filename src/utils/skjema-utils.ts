import { SkjemaFeil } from './types/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from '../pages/utkast/skjema-section/begrunnelse/begrunnelse';
import { OrNothing } from './types/ornothing';
import { Opplysning } from '../pages/utkast/skjema-section/opplysninger/opplysninger';
import { MalformData, MalformType } from '../rest/data/malform';
import { HovedmalType, InnsatsgruppeType, Vedtak } from '../rest/data/vedtak';
import { erStandard, erVarigEllerGradertVarig } from './innsatsgruppe';

export interface SkjemaData {
	opplysninger: string[] | undefined;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	begrunnelse: OrNothing<string>;
}

export const opplysningslisteBokmal = [
	'Svarene dine fra da du registrerte deg',
	'CV-en/jobbprofilen din på nav.no',
	'Svarene dine om behov for veiledning'
];

export const opplysningslisteNynorsk = [
	'Svara dine frå då du registrerte deg',
	'CV-en/jobbprofilen din på nav.no',
	'Svara dine om behov for rettleiing'
];

export function hentMalformFraData(malformData: MalformData | null): MalformType | null {
	return malformData ? malformData.malform : null;
}

export function mapOpplysningerFraForskjelligMalformTilBokmal(opplysningerListe: string[]): string[] {
	return opplysningerListe.map(opplysning => {
		const translationPos = opplysningslisteNynorsk.indexOf(opplysning);
		return translationPos === -1 ? opplysning : opplysningslisteBokmal[translationPos];
	});
}

export function mapOpplysningerFraBokmalTilBrukersMalform(
	opplysningerListe: string[] | undefined,
	malformType: MalformType | null
): string[] {
	if (!opplysningerListe) return [];

	// Trenger ikke å mappe hvis vi ikke vet malform eller det allerede er på bokmål
	if (!malformType || malformType === MalformType.NB) return opplysningerListe;

	return opplysningerListe.map(opplysning => {
		const translationPos = opplysningslisteBokmal.indexOf(opplysning);
		return translationPos === -1 ? opplysning : opplysningslisteNynorsk[translationPos];
	});
}

export function mergeMedDefaultOpplysninger(opplysningListe: string[]): Opplysning[] {
	const opplysninger = opplysningslisteBokmal.map(opplysningTekst => ({
		navn: opplysningTekst,
		erValgt: opplysningListe.includes(opplysningTekst)
	}));

	opplysningListe
		.filter(opplysningTekst => !opplysningslisteBokmal.includes(opplysningTekst))
		.forEach(opplysningTekst => opplysninger.push({ navn: opplysningTekst, erValgt: true }));

	return opplysninger;
}

export function erDefaultOpplysning(opplysning: string) {
	return opplysningslisteBokmal.some(defaultOpplysning => defaultOpplysning === opplysning);
}

export function harFeil(skjemaFeil: SkjemaFeil): boolean {
	return Object.keys(skjemaFeil).length > 0;
}

export function scrollTilForsteFeil(skjemaFeil: SkjemaFeil): void {
	let forsteFeilNavn;

	if (skjemaFeil.opplysninger) {
		forsteFeilNavn = 'opplysninger';
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
		errors.opplysninger = 'Mangler kilder';
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

export function trengerBeslutter(innsatsgruppe: OrNothing<InnsatsgruppeType>) {
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
